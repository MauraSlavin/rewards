/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Wait until page is loaded
$(document).ready(() => {
  // These need to be done...

  // **** LISTENING - COLUMN 1
  // Listen for click on a chore item in column 1
  //   When that happens - capture what chore it was
  //   Add the chore icon to the "To Do" list in column 2
  //       with clickable check mark
  //       and with "remove" button
  //   Write record to assignedChores with current childid and chore chosen

  // **** LISTENING - COLUMN 2 ----

  // Listen for click on any CHECKMARK
  //    When first is clicked, enable "Request Parent Approval" button
  //    Keep track of which Chores are clicked.
  //    Keep checkmark colored as checked until Parent Approved is clicked.

  // Listen for click on any REMOVE
  //    When clicked,
  //      The corresponding record is deleted from the assignedChores table
  //      The chore is removed from the page (along with the checkmark and remove button)

  // Listen for "Request Parent Approval" button clicked
  //    When clicked,
  //    An email is sent to the parent
  //    The Parent Approval button is enabled.
  //    The Parent must physically come and click the "Parent Approval" button

  // **** LISTENING - COLUMN 3  (This was done in the html.)
  // Listen for the Collect my Reward button to be clicked.
  // Re-direct the user to the Rewards page.

  // This function gets chore icons from the database, and updates the html page
  function loadChoreIcons() {
    //  iconEl is the html elements for the icon
    let iconEl = '';
    let begIconEl = ''; // the beginning is always the same

    // beginning of icon element is always the same.
    // <div for the col>
    begIconEl = '<div class="col s12 m4 left iconbutton icons"> '; // start div for column with this icon button
    // <button>
    begIconEl += '<button class="waves-effect waves-light hoverable z-depth-2 '; // most of button tag. close after data-id added

    $.get('api/chores', (chores) => {
      //  For each Chore, build an html icon (w/points),
      chores.forEach((chore) => {
        // customize the image part of the icon element w/image, title and points; and append
        iconEl = begIconEl; // beginning
        iconEl += `data-id="${chore.id}"> `; // data id with chore id so we know what was clicked
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `src="assets/css/images/${chore.iconfile}" `; // source for image
        iconEl += `alt="${chore.title}">`; // alt for image
        iconEl += `${chore.title} - ${chore.points}`; // text for image if we use title, too
        // iconEl += `${chore.points}`; // text for image
        iconEl += '</img></button></div>'; // and end tags
        // console.log(iconEl);

        // append row to html file in column 2
        $('.column1').append(iconEl);
      }); // end of forEach
    }) // end of get
      .catch((err) => {
        console.log(err);
      }); // end of catch
  } // endof loadChoreIcons function

<<<<<<< HEAD
  // **** LOAD PAGE - COLUMN 2
  // Build assigned chores with clickable checkmark and remove button
  //    - one chore per row
  // eslint-disable-next-line max-len
  // ("Request Parent Approval" and "Parent Approved" buttons will be there and don't need to be dynamically built)
  // "Request Parent Approval" and "Parent Approved" buttons start out disabled.
  // passes in the child id.  Only one child, so the id is 1.
  // eslint-disable-next-line no-use-before-define
  loadAssignedChoreIcons(1);
  //  disableButtons();
=======
  // Loads child's name and puts in on the html page in a couple places
  //  (nav bar on the right, and Congratulations box)
  function greetChild(childId) {
    $.get(`api/children/${childId}`, (child) => {
      // put child's name in wherever there's a greetname class
      $('.greetname').text(child.name);
      // put point balance in column 3 box
      $('#ptbalance').text(child.points);
    });
  }
>>>>>>> ae57a65ee14a461c18d7bd7ef98aa48c54046a1c

  // This function gets children's names from the database,
  // and uses them for the dropdown list on the nav bar
  function loadChildrenNames() {
    // Get the children's names (the emails are available here, too)
    $.get('api/children', (children) => {
      let childLink = ''; // will be used for the html for the link

      // for each child, add a link to the dropdown list in the nav bar
      children.forEach((child) => {
        childLink = `<li><a href="index.html">${child.name}</a></li>`;
        $('.childlinks').append(childLink);
      });
    });
  } // endof loadChildrenNames function

  // This function gets parents' names from the database,
  // and uses them for the dropdown list on the nav bar
  function loadParentNames() {
    let parentLink = ''; // will be used for the html for the link
    // Get the first parent's name (the email is available here, too)
    // This is only working for one child and one set of parents, so we
    //    don't need to worry about capturing which children belong to each parent.
    $.get('api/parents', (parents) => {
      // add a link to the dropdown list in the nav bar for the each parent
      parents.forEach((parent) => {
        parentLink = `<li><a href="parent1.html">${parent.name}</a></li>`;
        $('.parentlinks').append(parentLink);
      }); // end of forEach
    }); // end of get
  } // endof loadParentsNames function

  // This function gets assigned chore icons from the database, and updates the html page
  function loadAssignedChoreIcons(childId) {
    //  iconEl, checkEl, removeEl are the html elements for the icon, check button and remove button
    let rowEl = ''; // the whole thing goes in a row for each icon
    let begIconEl = ''; // beginning of icon element
    let iconEl = '';
    let begChkEl = ''; // begining of checkmare is always the same.
    let chkImg = ''; // checkmark image is always the same
    let checkEl = '';
    let begRemEl = ''; // beginning of remove is always the same, too.
    let removeEl = '';
    let remImg = ''; // remove image is always the same

    // beginning of icon element is always the same.
    begIconEl = '<div class="col s4 left iconbutton"> '; // start div for column with this icon button
    begIconEl
      += '<button class="waves-effect waves-light hoverable z-depth-2 disabled" '; // most of button tag

    // beginning of check mark button
    begChkEl = '<div class="col s4 left iconbutton"> '; // start div for column with this checkmark button
    begChkEl
      += '<button class="waves-effect waves-light hoverable z-depth-2 checkbutton" '; // most of checkmark button tag
    chkImg = '<img class="responsive-img" '; // start image tag with class
    chkImg += 'src="assets/css/images/check.png" '; // source for image
    chkImg += 'alt="checkmark">'; // alt for image

    // beginning of remove button
    begRemEl = '<div class="col s4 left iconbutton"> '; // start div for column with this remove button
    begRemEl
      += '<button class="waves-effect waves-light red hoverable z-depth-2 removebutton" '; // most of remove button tag
    remImg = '<img class="responsive-img" '; // start image tag with class
    remImg += 'src="assets/css/images/remove.png" '; // source for image
    remImg += 'alt="remove">'; // alt for image

    $.get(`api/assignedchores/${childId}`, (assignedChores) => {
<<<<<<< HEAD
      // eslint-disable-next-line max-len
      //  For each assignedChore, build an html row with the icon (w/title & points), check & remove buttons
=======
      //  For each assignedChore, build an html row with the icon (w/title & points),
      //     check & remove buttons
>>>>>>> ae57a65ee14a461c18d7bd7ef98aa48c54046a1c
      assignedChores.forEach((chore) => {
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
        iconEl += `${chore.Chore.title} - ${chore.Chore.points}`; // text for image
        // iconEl += '</img></button></div>'; // and end tags (icon not a button - Maura)
        iconEl += '<img></div>'; // and end tags
        // put icon in row
        rowEl += iconEl;

        // add checkmark button
        checkEl = begChkEl; // beginning
        checkEl += `data-id="${chore.id}" `; // data id with assignedChore id so we know what was clicked
        checkEl += `data-choreid="${chore.ChoreId}"> `; // data id with chore id (primary key in chore table)
        checkEl += chkImg; // include the checkmark image
        checkEl += '</button></div>'; // end tags
        // console.log(checkEl);
        // put checkmark in row
        rowEl += checkEl;

        // add remove button
<<<<<<< HEAD
        $('.column2icons').append(removeEl);
=======
        removeEl = begRemEl; // beginning
        removeEl += `data-id="${chore.id}" `; // data id with assigned Chore id so we know what was clicked
        removeEl += `data-choreid="${chore.ChoreId}"> `; // data id with chore id (primary key in chore table)
        removeEl += remImg; // include the remove image
        removeEl += '</button></div>'; // end tags
        // put remove icon in row
        rowEl += removeEl;

        // end row
        rowEl += '</div>';

        // append row to html file in column 2
        $('.column2icons').append(rowEl);
>>>>>>> ae57a65ee14a461c18d7bd7ef98aa48c54046a1c
      });
    }).catch((err) => {
      console.log(err);
    });
  } // end of loadAssignedChoreIcons function

  // When the "Parent Approved" button clicked
  //   When this is clicked:
  //  done: A record is inserted in the doneChores table for each chore done
  //  done: The corresponding record is deleted from the assignedChores table
  //  ***   The chores chosen disappear from the "To Do" list
  //  ***   The points for the child in the children table is increased by the points earned.
  //  done: "You have earned ?? points." is updated in column 3.
  //  NOT done: "Your total balance is ??." is updated in column 3.
  //  done  The "Request Parent Approval" and "Parent Approved" buttons become disabled.
  function handleParentApproval(choresDone, childId) {
    // choresDone is an array of objects with id (from assignedChores), ChoreId, and points
    let pointsEarned = 0;
    // For each chore...
    // ******  NEED TO REMOVE HTML from page for chores checked off
    //   Add the points for that chore to the points earned.
    //   Write a record in the doneChores table for each chore completed.
    //   Delete the record from the assignedChores table
    choresDone.forEach((choreDone) => {
      pointsEarned += choreDone.points;
      console.log(`\nPoints earned:  ${pointsEarned}`);
      $.post(`/api/donechores/${childId}/${choreDone.choreId}`, () => {
        $.ajax({
          method: 'DELETE',
          url: `/api/assignedchores/${choreDone.id}`,
        })
          .then(() => {
            console.log(`Chore:${choreDone.id} deleted from AssignedChores.`);
          })
          .catch((err) => {
            console.log(err);
          }); // end of ajax DELETE

        // ******  NEED TO REMOVE HTML from page for chores checked off
      }); // end of post donechores
    }); // end of forEach

    // Put points earned this session in 3rd column.
    $('#ptsearned').text(pointsEarned);

    // "Request Parent Approval" and "Parent Approved" buttons return to being disabled.
    $('.request').attr('disabled', true);
    $('.approve').attr('disabled', true);
  } // end of handleParentApproval

  // handle when check button is clicked
  function handleCheckBtn() {
    console.log('In handleCheckBtn - not written yet');
    // needs to be written!!
  }

  // handle when remove button is clicked
  function handleRemoveBtn() {
    console.log('In handleRemoveBtn - not written yet');
    // needs to be written!!
  }

  function renderIndexHTML() {
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
    $('.request').attr('disabled', true);
    $('.approve').attr('disabled', true);
  } // end of renderIndexHTML function

  // Get data from database and dynamically create html before showing the user the page.
  renderIndexHTML();

  // handle when Parent Approved button is clicked
  //   $( "#target" ).click(function() {
  //   alert( "Handler for .click() called." );
  // });
  $('.approve').attr('disabled', false); // Maura for testing
  $('.approve').click(() => {
    // expect choresDone to be an array of objects with id (from assignedChores) chore ids & points
    // This should be available from the html.  Maybe retrieve within function??
    // Need to know which CHECKMARKS where clicked.
    // we know it's for child 1 because it only works for one child

    // *****************
    //    Need to get this information from the html when the check or remove button is clicked
    // ******************
    //
    // for testing (Maura)
    const choresDone = [
      // determine what button was clicked in column 2
      // for testing
      {
        id: 1,
        choreId: 8,
        points: 20,
      },
      {
        id: 2,
        choreId: 10,
        points: 30,
      },
    ];
    handleParentApproval(choresDone, 1);
  }); // end clicking on "Parent approval button"

  // listen for click on checkmark or remove buttons
  $('.column2icons').bind('click', () => {
    console.log('Check or remove clicked.');
    // id is the data-id (assignedChore id) from the icon clicked (from the html)
    const id = $('.checkbutton').data('id');
    // id is the data-choreId from the icon clicked (from the html)
    const choreId = $('.checkbutton').data('choreid');

    //
    // ***  PROBLEM - ALWAYS RETURNS FIRST, REGARDLESS OF WHICH WAS CLICKED! ***
    // PRobably should build choresDone array of objects here, rather than in the handleParentApproval method
    //

    console.log('\nassigned chore id:');
    console.log(id);
    console.log('\nchore id:');
    console.log(choreId);

    // pseudo code...
    // If a Check button was clicked
    //   handleCheckBtn();
    // } else { if a Remove button was clicked
    //   handleRemoveBtn();
    // } // end if else stmt
  }); // end bind click stmt to listen for click on check or remove
}); // end of $(document).ready
