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
  // global because it's used in more than one place for the same purpose
  let choresDone = [];

  // checkmark and remove icons are needed in more than one place, so make a global
  // checkmark image
  let chkImg = '<img class="responsive-img" '; // start image tag with class
  chkImg += 'src="assets/css/images/checkClear.png" '; // source for image
  chkImg += 'alt="checkmark">'; // alt for image

  // remove image
  let remImg = '<img class="responsive-img" '; // start image tag with class
  remImg += 'src="assets/css/images/remove.png" '; // source for image
  remImg += 'alt="remove">'; // alt for image

  // need child's point balance in more than one place
  let ptsBalance = 0;

  // These need to be done...

  // When a parent assigns a chore to the child, an email will be sent to the parent.
  // When a child clicks "Request Parent Approval," an email is sent to the child.

  //
  //
  // This function gets chore icons from the database, and updates the html page
  function loadChoreIcons() {
    //  iconEl is the html elements for the icon
    let iconEl = '';
    let begIconEl = ''; // the beginning is always the same

    // beginning of icon element is always the same.
    // <div for the col>
    begIconEl += '<div class="card light-blue lighten-2">';
    // most of button tag. close after data-id added
    begIconEl
      += '<button class="waves-effect waves-light hoverable z-depth-2 choreicon" ';

    $.get('api/chores', (chores) => {
      //  For each Chore, build an html icon (w/points),
      chores.forEach((chore) => {

        // customize the image part of the icon element w/image, title and points; and append
        iconEl = begIconEl; // beginning
        // data id with chore id, chore title and file with icon image to use when clicked on to assign a chore
        iconEl += `data-id="${chore.id}" data-title="${chore.title}" data-file="${chore.iconfile}" data-points="${chore.points}"> `;
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `src="assets/css/images/${chore.iconfile}" `; // source for image
        iconEl += `alt="${chore.title}">`; // alt for image
        iconEl += `${chore.points}`; // text for image with the points
        iconEl += '</img></button></div>'; // and end tags

        // append row to html file in column 2
        $('.column1').append(iconEl);
      }); // end of forEach
    }) // end of get
      .catch((err) => {
        console.log(err);
      }); // end of catch
  } // endof loadChoreIcons function

  //
  //
  // Loads child's name and puts in on the html page in a couple places
  //  (nav bar on the right, and Congratulations box)
  function greetChild(childId) {
    $.get(`api/children/${childId}`, (child) => {
      // put child's name in wherever there's a greetname class
      $('.greetname').text(child.name);
      // put point balance in column 3 box
      ptsBalance = child.points; // ptsBalance is a global
      $('#ptbalance').text(ptsBalance);
    });
  }

  //
  //
  // This function gets children's names from the database,
  // and uses them for the dropdown list on the nav bar
  function loadChildrenNames() {
    // Get the children's names (the emails are available here, too)
    $.get('api/children', (children) => {
      let childLink = ''; // will be used for the html for the link

      // for each child, add a link to the dropdown list in the nav bar
      children.forEach((child) => {
        childLink = `<li><a href="child.html">${child.name}</a></li>`;
        $('.childlinks').append(childLink);
      });
    });
  } // endof loadChildrenNames function

  //
  //
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
        parentLink = `<li><a href="parent.html">${parent.name}</a></li>`;
        $('.parentlinks').append(parentLink);
      }); // end of forEach
    }); // end of get
  } // endof loadParentNames function

  //
  //
  // This function gets assigned chore icons from the database, and updates the html page
  function loadAssignedChoreIcons(childId) {
    //  iconEl, checkEl, removeEl are the html elements for the icon, check button and remove button
    let rowEl = ''; // the whole thing goes in a row for each icon
    let begIconEl = ''; // beginning of icon element
    let iconEl = '';
    let begChkEl = ''; // begining of checkmare is always the same.
    let checkEl = '';
    let begRemEl = ''; // beginning of remove is always the same, too.
    let removeEl = '';

    // beginning of icon element is always the same.
    begIconEl = '<div class="col s4 left"> '; // start div for column with this icon button
    // begIconEl
    //   // not really a button, but keep same formatting.  So no "hoverable" and make disabled.
    begIconEl // most of button tag
      += '<button class="waves-effect waves-light hoverable z-depth-2 checkicon" '; // most of checkmark button tag

    // beginning of check mark button
    begChkEl = '<div class="col s4 left"> '; // start div for column with this checkmark button
    begChkEl
      += '<button class="waves-effect waves-light hoverable z-depth-2 checkbutton" '; // most of checkmark button tag

    // beginning of remove button
    begRemEl = '<div class="col s4 left"> '; // start div for column with this remove button
    begRemEl
      += '<button class="waves-effect waves-light red hoverable z-depth-2 removebutton" '; // most of remove button tag

    $.get(`api/assignedchores/${childId}`, (assignedChores) => {
      //  For each assignedChore, build an html row with the icon (w/title & points),
      //     check & remove buttons
      assignedChores.forEach((chore) => {
        // add assigned chores icon

        // begin row;  flex keeps things lined up nicely
        rowEl = '<div class="row flex">';

        // customize the image part of the icon element w/image, title and points; and append
        iconEl = begIconEl; // beginning
        iconEl += `data-id="${chore.id}" `; // data id with assignedChore id so we know what was clicked
        iconEl += `data-choreid="${chore.ChoreId}" `; // chore id (primary key in chore table)
        iconEl += `data-points="${chore.Chore.points}"> `; // points the chore is worth
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `src="assets/css/images/${chore.Chore.iconfile}" `; // source for image
        iconEl += `alt="${chore.Chore.title}">`; // alt for image
        iconEl += `${chore.Chore.points}`; // text for image (points chore is worth)
        iconEl += '</img></button></div>'; // and end tags
        // put icon in row
        rowEl += iconEl;

        // add checkmark button
        checkEl = begChkEl; // beginning
        checkEl += `data-id="${chore.id}" `; // data id with assignedChore id so we know what was clicked
        checkEl += `data-choreid="${chore.ChoreId}" `; // chore id (primary key in chore table)
        checkEl += `data-points="${chore.Chore.points}"> `; // points the chore is worth
        checkEl += chkImg; // include the checkmark image (global)
        checkEl += '</button></div>'; // end tags
        // put checkmark in row
        rowEl += checkEl;

        // add remove button
        removeEl = begRemEl; // beginning
        removeEl += `data-id="${chore.id}" `; // data id with assigned Chore id so we know what was clicked
        removeEl += `data-choreid="${chore.ChoreId}"> `; // data id with chore id (primary key in chore table)
        removeEl += remImg; // include the remove image (global)
        removeEl += '</button></div>'; // end tags
        // put remove icon in row
        rowEl += removeEl;

        // end row
        rowEl += '</div>';

        // append row to html file in column 2
        $('.column2icons').append(rowEl);
      });
    }).catch((err) => {
      console.log(err);
    });
  } // end of loadAssignedChoreIcons function

  //
  //
  // handles child requesting parental approval
  // ***************************
  //    needs to send email to parent!!
  //
  // ***************************
  function handleRequestApproval(childId) {
    // Still needs to send email to parent

    // turn "Request Parent Approval" button off
    // ...since we just did it, and don't need to do again
    $('.request').attr('disabled', true);
    // turn "Parent Approved" on for the parent to click
    $('.approve').attr('disabled', false);
  }

  //
  //
  // When the "Parent Approved" button clicked
  //  A record is inserted in the doneChores table for each chore done
  //  The corresponding record is deleted from the assignedChores table
  //  The chores chosen disappear from the "To Do" list
  //  The points for the child in the children table is increased by the points earned.
  //  "You have earned ?? points." is updated in column 3.
  //  "Your total balance is ??." is updated in column 3.
  //  The "Request Parent Approval" and "Parent Approved" buttons become disabled.
  function handleParentApproval(childId) {
    // choresDone (global) is an array of objects with assigned chore id (from assignedChores), ChoreId, and points
    let pointsEarned = 0;
    // For each chore...
    //   Add the points for that chore to the points earned.
    //   Write a record in the doneChores table for each chore completed.
    //   Delete the record from the assignedChores table
    choresDone.forEach((choreDone) => {
      // increment pointsEarned to keep track for message on page of points earned this session
      pointsEarned += choreDone.points;

      // it's child 1, because only functional for one child.
      $.ajax({
        method: 'DELETE',
        url: `/api/assignedchores/${choreDone.id}`,
      })
        .then(() => {
          console.log(`Chore:${choreDone.id} deleted from AssignedChores.`);
        })
        .then(() => {
          $.ajax({
            method: 'PUT',
            url: `/api/children/1/add/${choreDone.points}`,
          })
            .then(() => {
              $.ajax({
                method: 'POST',
                url: `/api/donechores/1/${choreDone.choreId}`,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }); // end of ajax calls
      // }); // end of post donechores
    }); // end of forEach

    // Put points earned this approval in 3rd column.
    $('#ptsearned').text(pointsEarned);

    // Put new balance on the html page
    ptsBalance += pointsEarned; // update global points
    $('#ptbalance').text(ptsBalance);

    // Delete all rows with "todelete" class
    $('.todelete').remove();
    // and clear choresDone array (global)
    choresDone = [];

    // re-set approval...
    // "Request Parent Approval" and "Parent Approved" buttons return to being disabled.
    $('.request').attr('disabled', true);
    $('.approve').attr('disabled', true);
  } // end of handleParentApproval

  //
  //
  function renderChildPage() {
    // Greet the child by name on the right side of the nav bar
    //   and load total points balance
    // Only one child, so we know it is id 1
    greetChild(1);
    console.log('Child greeted by name.');

    // (started - Sophie is working on...)
    // Build chore icons with points for "chores" column from chores table
    // Each icon will be clickable
    loadChoreIcons();
    console.log('Chore Icons in column 1 loaded.');

    // Populate dropdown list with child name from database
    loadChildrenNames();
    console.log("Children's names are in dropdown list.");

    // Populate dropdown list with parent name from database
    loadParentNames();
    console.log("Parents' names are in dropdown list.");

    // **** LOAD PAGE - COLUMN 2
    // Build assigned chores with clickable checkmark and remove button
    //    - one chore per row
    // passes in the child id.  Only one child, so the id is 1.
    loadAssignedChoreIcons(1);
    console.log('To Do list is loaded.');

    // ("Request Parent Approval" and "Parent Approved" buttons will be there and don't need to be dynamically built)
    // "Request Parent Approval" and "Parent Approved" buttons start out disabled.
    $('.request').attr('disabled', true);
    $('.approve').attr('disabled', true);
  } // end of renderChildPage function

  //* *****************************************************************************************/
  //
  //   Starts running tha app here.  Stuff before here is defining globals and functions.
  //
  //* *****************************************************************************************/
  // Get data from database and dynamically create html before showing the user the page.
  console.log('Functions defined.');
  renderChildPage();
  console.log('Page is done loading.');

  //
  //
  // listen for the "Parent Approved" button to be clicked.
  $('.approve').click(() => {
    console.log('Parent Approvel butten has been clicked.');
    handleParentApproval(1); // Only designed to work for child 1
  }); // end clicking on "Parent approval button"

  //
  //
  // listen for click on "Request Parent Approval"
  $('.request').click(() => {
    // we know it's for child 1 because it only works for one child
    console.log('Request parental approval was clicked.');
    handleRequestApproval(1);
  }); // end clicking on "Parent approval button"

  //
  //
  // when checkmark in To Do list (assigned chores list) is clicked...
  $('.column2icons').on('click', '.checkbutton', function (event) {
    console.log('A checkmark has been clicked.');
    // make sure "Request Parent Approval" button is now enabled.
    $('.request').attr('disabled', false);

    // replace un-checked checkmark icon with checked checkmark icon
    // and make it disabled, so it doesn't get counted twice.
    $(this)
      .find('img')
      .attr('src', 'assets/css/images/checkGreen.png');
    $(this)
      .attr('disabled', true);

    // add id to change look of row, and so we can delete it when the parent approves
    $(this)
      .parent()
      .parent()
      .addClass('todelete');

    // id is the data-id (assignedChore id) from the icon clicked (from the html)
    const id = $(this).data('id');
    // data-choreId from the icon clicked (from the html)
    const choreId = $(this).data('choreid');
    // points from the html that the chore is worth
    const points = $(this).data('points');

    // put data from html and put in object to push to global choresDone array
    let choreDone = {
      id,
      choreId,
      points,
    };

    choresDone.push(choreDone);
  });

  //
  //
  // when icon in To Do list (assigned chores list) is clicked... (almost same as checkmark)
  $('.column2icons').on('click', '.checkicon', function (event) {
    console.log('A checkmark icon has been clicked.');
    // make sure "Request Parent Approval" button is now enabled.
    $('.request').attr('disabled', false);

    // add id to change look of row, and so we can delete it when the parent approves
    // and make it disabled, so it doesn't get counted twice.
    // replace un-checked checkmark icon with checked checkmark icon
    $(this)
      .parent()
      .parent().addClass('todelete')
      .find('.checkbutton').attr('disabled', true)
      .find('img')
      .attr('src', 'assets/css/images/checkGreen.png');

    // and make this icon disabled, so it doesn't get counted twice.
    $(this)
      .attr('disabled', true);

    // id is the data-id (assignedChore id) from the icon clicked (from the html)
    const id = $(this).data('id');
    // data-choreId from the icon clicked (from the html)
    const choreId = $(this).data('choreid');
    // points from the html that the chore is worth
    const points = $(this).data('points');

    // put data from html and put in object to push to global choresDone array
    let choreDone = {
      id,
      choreId,
      points,
    };

    choresDone.push(choreDone);
  });

  //
  //
  // listen for click on any remove icon (in the assigned chores list)
  $('.column2icons').on('click', '.removebutton', function (event) {
    console.log('A remove button has been clicked.');
    // id is the data-id (assignedChore id) from the icon clicked (from the html)
    const id = $(this).data('id');
    // data-choreId from the icon clicked (from the html)
    const choreId = $(this).data('choreid');

    // remove element from page
    $(this)
      .parent()
      .parent()
      .remove();

    // remove chore from doneChores array (if it's there)
    choresDone = $.grep(choresDone, (el, idx) => el.id == id, true);
console.log('choresDone');
console.log(choresDone);
    // delete from assignedChores table
    // we know it's child 1, since only implemented for 1 child.
    $.ajax({
      method: 'DELETE',
      url: `/api/assignedchores/${id}`,
    })
      .then(() => {
        console.log(`Chore:${id} deleted from AssignedChores.`);
      })
      .catch((err) => {
        console.log(err);
      });

    // if doneChores array now empty, disable Request Parent Approval button
    if (choresDone.length === 0) {
      $('.request').attr('disabled', true);
    }
  }); // end remove button click block

  //
  //
  // listen for click on an icon in the first column to assign a chore
  $('.column1').on('click', '.choreicon', function (event) {
    console.log('An icon has been clicked to assign a chore.');

    // get chore id clicked from the html
    const id = $(this).data('id');
    const iconfile = $(this).data('file');
    const title = $(this).data('title');
    const points = $(this).data('points');
    let newAssignedChoreId = ''; // will get from res when written to table

    // write record to assigned chores table
    $.ajax({
      method: 'POST',
      url: `/api/assignedchores/1/${id}`,
    })
      .then((res) => {
        console.log(
          `Chore ${id} written to assigned chores table for child 1.`,
        );
        newAssignedChoreId = res.id;

      })
      .then(() => {
        // build the whole row, with the icon, check and remove icons
        // beginning row
        let rowEl = '<div class="row flex">';
        rowEl += '<div class="col s4 left"> '; // start div for column with this icon button

        rowEl
          += '<button class="waves-effect waves-light hoverable z-depth-2 checkicon" '; // most of checkmark button tag
        rowEl += `data-id="${newAssignedChoreId}" `; // data id with assignedChore id so we know what was clicked
        rowEl += `data-choreid="${id}" `; // chore id (primary key in chore table)
        rowEl += `data-points="${points}"> `; // points the chore is worth
        rowEl += '<img class="responsive-img" '; // start image tag w/class
        rowEl += `<img src="assets/css/images/${iconfile}" `; // source for image
        rowEl += `alt="${title}">`; // alt for image
        rowEl += `${points}`; // text for image (points chore is worth)
        rowEl += '</img></button></div>'; // and end tags

        // add checkmark button
        // beginning of check mark button
        rowEl += '<div class="col s4 left"> '; // start div for column with this checkmark button
        rowEl
          += '<button class="waves-effect waves-light hoverable z-depth-2 checkbutton" '; // most of checkmark button tag
        rowEl += `data-id="${newAssignedChoreId}" `; // data id with assignedChore id so we know what was clicked
        rowEl += `data-choreid="${id}" `; // chore id (primary key in chore table)
        rowEl += `data-points="${points}"> `; // points the chore is worth
        rowEl += chkImg; // include the checkmark image (global)
        rowEl += '</button></div>'; // end tags

        // add remove button
        // beginning of remove button
        rowEl += '<div class="col s4 left"> '; // start div for column with this remove button
        rowEl
          += '<button class="waves-effect waves-light red hoverable z-depth-2 removebutton" '; // most of remove button tag
        rowEl += `data-id="${newAssignedChoreId}" `; // data id with assignedChore id so we know what was clicked
        rowEl += `data-choreid="${id}"> `; // data id with chore id (primary key in chore table)
        rowEl += remImg; // include the remove image (global)
        rowEl += '</button></div>'; // end tags

        // end row
        rowEl += '</div></div>';

        // append row to html file in column 2
        $('.column2icons').append(rowEl);
      })
      .catch(() => {
        console.log(`Error writing chore ${id} to assigned chores table.`);
      });

  }); // end click on icon to assign chore block
  
  //
  //
}); // end of $(document).ready
