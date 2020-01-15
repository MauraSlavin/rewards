/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

// Wait until page is loaded
$(document).ready(() => {
  // array of chores child clicked as done.
  // each object has:
  // --- id: (assignedChores id)
  // --- choreId: choreId
  // --- points: points of chore done
  const choresDone = [];

  // need child's point balance in more than one place
  let ptsBalance = 0;
  console.log("child.js line 17: ptsbalance initialized...");
  console.log(("ptsBalance:  " + ptsBalance));

  // These need to be done...

  // **** LISTENING - COLUMN 1
  // Listen for click on a chore item in column 1
  //   When that happens - capture what chore it was
  //   Add the chore icon to the "To Do" list in column 2
  //       with clickable check mark
  //       and with "remove" button
  //   Write record to assignedChores with current childid and chore chosen

  // Listen for click on any REMOVE
  //    When clicked,
  //      The corresponding record is deleted from the assignedChores table
  //      The chore is removed from the page (along with the checkmark and remove button)

  // When "Request Parent Approval" button clicked
  //   an email is sent to the parent

  // When a parent assigns a chore to the child, an email will be sent to the parent.

  // This function gets chore icons from the database, and updates the html page
  function loadChoreIcons() {
    //  iconEl is the html elements for the icon
    let iconEl = "";
    let begIconEl = ""; // the beginning is always the same

    // beginning of icon element is always the same.
    // <div for the col>
    begIconEl = '<div class="col s12 m4 left iconbutton icons"> '; // start div for column with this icon button
    // <button>
    begIconEl +=
      '<button class="waves-effect waves-light hoverable z-depth-2 choreicon'; // most of button tag. close after data-id added

    $.get("api/chores", chores => {
      //  For each Chore, build an html icon (w/points),
      chores.forEach(chore => {
        console.log(chore);

        // customize the image part of the icon element w/image, title and points; and append
        iconEl = begIconEl; // beginning
        iconEl += `data-id="${chore.id}"> `; // data id with chore id so we know what was clicked
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `src="assets/css/images/${chore.iconfile}" `; // source for image
        iconEl += `alt="${chore.title}">`; // alt for image
        iconEl += `${chore.points}`; // text for image with the points
        // iconEl += `${chore.points}`; // text for image
        iconEl += "</img></button></div>"; // and end tags
        console.log(iconEl);

        // append row to html file in column 2
        $(".column1").append(iconEl);
      }); // end of forEach
    }) // end of get
      .catch(err => {
        console.log(err);
      }); // end of catch
  } // endof loadChoreIcons function

  // Loads child's name and puts in on the html page in a couple places
  //  (nav bar on the right, and Congratulations box)
  function greetChild(childId) {
    $.get(`api/children/${childId}`, child => {
      // put child's name in wherever there's a greetname class
      $(".greetname").text(child.name);
      // put point balance in column 3 box
      ptsBalance = child.points; // ptsBalance is a global
      console.log(
        "child.js line 86: ptsbalance RE-initialized from db, and put on child page..."
      );
      console.log(("ptsBalance:  " + ptsBalance));
      $("#ptbalance").text(ptsBalance);
    });
  }

  // This function gets children's names from the database,
  // and uses them for the dropdown list on the nav bar
  function loadChildrenNames() {
    // Get the children's names (the emails are available here, too)
    $.get("api/children", children => {
      let childLink = ""; // will be used for the html for the link

      // for each child, add a link to the dropdown list in the nav bar
      children.forEach(child => {
        childLink = `<li><a href="child.html">${child.name}</a></li>`;
        $(".childlinks").append(childLink);
      });
    });
  } // endof loadChildrenNames function

  // This function gets parents' names from the database,
  // and uses them for the dropdown list on the nav bar
  function loadParentNames() {
    let parentLink = ""; // will be used for the html for the link
    // Get the first parent's name (the email is available here, too)
    // This is only working for one child and one set of parents, so we
    //    don't need to worry about capturing which children belong to each parent.
    $.get("api/parents", parents => {
      // add a link to the dropdown list in the nav bar for the each parent
      parents.forEach(parent => {
        parentLink = `<li><a href="parent.html">${parent.name}</a></li>`;
        $(".parentlinks").append(parentLink);
      }); // end of forEach
    }); // end of get
  } // endof loadParentsNames function

  // This function gets assigned chore icons from the database, and updates the html page
  function loadAssignedChoreIcons(childId) {
    //  iconEl, checkEl, removeEl are the html elements for the icon, check button and remove button
    let rowEl = ""; // the whole thing goes in a row for each icon
    let begIconEl = ""; // beginning of icon element
    let iconEl = "";
    let begChkEl = ""; // begining of checkmare is always the same.
    let chkImg = ""; // checkmark image is always the same
    let checkEl = "";
    let begRemEl = ""; // beginning of remove is always the same, too.
    let removeEl = "";
    let remImg = ""; // remove image is always the same

    // beginning of icon element is always the same.
    begIconEl = '<div class="col s4 left iconbutton"> '; // start div for column with this icon button
    begIconEl +=
      // not really a button, but keep same formatting.  So no "hoverable" and make disabled.
      '<button class="waves-effect waves-light z-depth-2 disabled" '; // most of button tag; not a button!

    // beginning of check mark button
    begChkEl = '<div class="col s4 left iconbutton"> '; // start div for column with this checkmark button
    begChkEl +=
      '<button class="waves-effect waves-light hoverable z-depth-2 checkbutton" '; // most of checkmark button tag

    // beginning of remove button
    begRemEl = '<div class="col s4 left iconbutton"> '; // start div for column with this remove button
    begRemEl +=
      '<button class="waves-effect waves-light red hoverable z-depth-2 removebutton" '; // most of remove button tag

    // checkmark image
    chkImg = '<img class="responsive-img" '; // start image tag with class
    chkImg += 'src="assets/css/images/check.png" '; // source for image
    chkImg += 'alt="checkmark">'; // alt for image

    remImg = '<img class="responsive-img" '; // start image tag with class
    remImg += 'src="assets/css/images/remove.png" '; // source for image
    remImg += 'alt="remove">'; // alt for image

    $.get(`api/assignedchores/${childId}`, assignedChores => {
      //  For each assignedChore, build an html row with the icon (w/title & points),
      //     check & remove buttons
      assignedChores.forEach(chore => {
        // add assigned chores icon

        // begin row;  flex keeps things lined up nicely
        rowEl = '<div class="row flex">';

        // customize the image part of the icon element w/image, title and points; and append
        iconEl = begIconEl; // beginning
        // don't need this now, but may in the future (Maura)
        iconEl += `data-id="${chore.id}"> `; // data id with assignedChore id so we know what was clicked
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `<img src="assets/css/images/${chore.Chore.iconfile}" `; // source for image
        iconEl += `alt="${chore.Chore.title}">`; // alt for image
        iconEl += `${chore.Chore.points}`; // text for image (points chore is worth)
        // iconEl += '</img></button></div>'; // and end tags (icon not a button - Maura)
        iconEl += "<img></div>"; // and end tags
        // put icon in row
        rowEl += iconEl;

        // add checkmark button
        checkEl = begChkEl; // beginning
        checkEl += `data-id="${chore.id}" `; // data id with assignedChore id so we know what was clicked
        checkEl += `data-choreid="${chore.ChoreId}" `; // chore id (primary key in chore table)
        checkEl += `data-points="${chore.Chore.points}"> `; // points the chore is worth
        checkEl += chkImg; // include the checkmark image
        checkEl += "</button></div>"; // end tags
        // console.log(checkEl);
        // put checkmark in row
        rowEl += checkEl;

        // add remove button
        removeEl = begRemEl; // beginning
        removeEl += `data-id="${chore.id}" `; // data id with assigned Chore id so we know what was clicked
        removeEl += `data-choreid="${chore.ChoreId}"> `; // data id with chore id (primary key in chore table)
        removeEl += remImg; // include the remove image
        removeEl += "</button></div>"; // end tags
        // put remove icon in row
        rowEl += removeEl;

        // end row
        rowEl += "</div>";

        // append row to html file in column 2
        $(".column2icons").append(rowEl);
      });
    }).catch(err => {
      console.log(err);
    });
  } // end of loadAssignedChoreIcons function

  // handles child requesting parental approval
  // ***************************
  //    needs to send email to parent!!
  //
  // ***************************
  function handleRequestApproval(childId) {
    // Still needs to send email to parent

    // turn "Request Parent Approval" button off
    // ...since we just did it, and don't need to do again
    $(".request").attr("disabled", true);
    // turn "Parent Approved" on for the parent to click
    $(".approve").attr("disabled", false);
  }

  // When the "Parent Approved" button clicked
  //  A record is inserted in the doneChores table for each chore done
  //  The corresponding record is deleted from the assignedChores table
  //  The chores chosen disappear from the "To Do" list
  //  The points for the child in the children table is increased by the points earned.
  //  "You have earned ?? points." is updated in column 3.
  //  "Your total balance is ??." is updated in column 3.
  //  The "Request Parent Approval" and "Parent Approved" buttons become disabled.
  function handleParentApproval(choresDone, childId) {
    // choresDone is an array of objects with id (from assignedChores), ChoreId, and points
    let pointsEarned = 0;
    // For each chore...
    //   Add the points for that chore to the points earned.
    //   Write a record in the doneChores table for each chore completed.
    //   Delete the record from the assignedChores table
    choresDone.forEach(choreDone => {
      pointsEarned += choreDone.points;
      console.log(`\nPoints earned:  ${pointsEarned}`);
      console.log("line 248: pts balance INCREMENTED in database:" + choreDone.points)
      $.post(`/api/donechores/${childId}/${choreDone.choreId}`, () => {
        $.ajax({
          method: "DELETE",
          url: `/api/assignedchores/${choreDone.id}`
        })
          .then(() => {
            console.log(`Chore:${choreDone.id} deleted from AssignedChores.`);
          })
          .then(() => {
            $.ajax({
              method: "PUT",
              url: `/api/children/${childId}/${choreDone.points}`,
            }).catch(err => {
              console.log(err);
            });
          }); // end of ajax calls
      }); // end of post donechores
    }); // end of forEach

    // Put points earned this session in 3rd column.
    $("#ptsearned").text(pointsEarned);

    // Put new balance on the html page
    ptsBalance += pointsEarned; // update global points
    console.log("child.js line 272: ptsbalance incremented...");
    console.log("Points Earned: " + pointsEarned);
    console.log("ptsBalance:  " + ptsBalance);
    console.log("Line 275: put on child page.");
    $("#ptbalance").text(ptsBalance);

    // Delete all rows with "todelete" class
    $(".todelete").remove();

    // "Request Parent Approval" and "Parent Approved" buttons return to being disabled.
    $(".request").attr("disabled", true);
    $(".approve").attr("disabled", true);
  } // end of handleParentApproval

  // handle when check button is clicked
  function handleCheckBtn() {
    console.log("In handleCheckBtn - not written yet");
    // needs to be written!!
  }

  // handle when remove button is clicked
  function handleRemoveBtn() {
    console.log("In handleRemoveBtn - not written yet");
    // needs to be written!!
  }

  function renderChildPage() {
    // Greet the child by name on the right side of the nav bar
    //   and load total points balance
    // Only one child, so we know it is id 1
    greetChild(1);

    // (started - Sophie is working on...)
    // Build chore icons with points for "chores" column from chores table
    // Each icon will be clickable
    loadChoreIcons();

    // Populate dropdown list with child name from database
    loadChildrenNames();

    // Populate dropdown list with parent name from database
    loadParentNames();

    // **** LOAD PAGE - COLUMN 2
    // Build assigned chores with clickable checkmark and remove button
    //    - one chore per row
    // passes in the child id.  Only one child, so the id is 1.
    loadAssignedChoreIcons(1);

    // ("Request Parent Approval" and "Parent Approved" buttons will be there and don't need to be dynamically built)
    // "Request Parent Approval" and "Parent Approved" buttons start out disabled.
    $(".request").attr("disabled", true);
    $(".approve").attr("disabled", true);
  } // end of renderChildPage function

  // Get data from database and dynamically create html before showing the user the page.
  renderChildPage();

  // listen for the "Parent Approved" button to be clicked.
  $(".approve").click(() => {
    handleParentApproval(choresDone, 1); // Only designed to work for child 1
  }); // end clicking on "Parent approval button"

  // listen for click on "Request Parent Approval"
  $(".request").click(() => {
    // we know it's for child 1 because it only works for one child
    console.log("Request parental approval was clicked.");
    handleRequestApproval(1);
  }); // end clicking on "Parent approval button"

  // listen for click on any checkmark
  $(".column2icons").on("click", ".checkbutton", function(event) {
    let choreDone = {}; // object to push to doneChores array w/id, choreid & points

    // make sure "Request Parent Approval" button is now enabled.
    $(".request").attr("disabled", false);

    // id is the data-id (assignedChore id) from the icon clicked (from the html)
    const id = $(this).data("id");
    // data-choreId from the icon clicked (from the html)
    const choreId = $(this).data("choreid");
    // points from the html that the chore is worth
    const points = $(this).data("points");

    // put data from html and put in object to push to global choresDone array
    choreDone = {
      id,
      choreId,
      points
    };
    choresDone.push(choreDone);

    // add id to change look of row, and so we can delete it when the parent approves
    $(this)
      .parent()
      .parent()
      .addClass("todelete");
  }); // end bind click stmt to listen for click on check
}); // end of $(document).ready
