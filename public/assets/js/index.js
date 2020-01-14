// Wait until page is loaded
$(document).ready(() => {
  // These need to be done...

  // **** LOAD PAGE - COLUMN 3
  // This column is mostly static.
  // The points earned should start at 0.
  // The current balance should be retrieved from the child table (column: points)

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

  // Listen for "Parent Approved" button clicked
  //   When this is clicked:
  //      A record is inserted in the doneChores table for each chore done
  //      The corresponding record is deleted from the assignedChores table
  //      The chores chosen disappear from the "To Do" list

  //      The points for the child in the children table is increased by the points earned.
  //      "You have earned ?? points." is updated in column 3.
  //      "Your total balance is ??." is updated in column 3.
  //      The "Request Parent Approval" and "Parent Approved" buttons become disabled.

  // **** LISTENING - COLUMN 3  (This can be done in the html, I think.)
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
    begIconEl
      += '<button class="waves-effect waves-light hoverable z-depth-2 '; // most of button tag. close after data-id added

    $.get('api/chores', (chores) => {
      //  For each Chore, build an html icon (w/points),
      chores.forEach((chore) => {
        console.log(chore);

        // customize the image part of the icon element w/image, title and points; and append
        iconEl = begIconEl; // beginning
        iconEl += `data-id="${chore.id}"> `; // data id with chore id so we know what was clicked
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `src="assets/css/images/${chore.iconfile}" `; // source for image
        iconEl += `alt="${chore.title}">`; // alt for image
        iconEl += `${chore.title} - ${chore.points}`; // text for image if we use title, too
        // iconEl += `${chore.points}`; // text for image
        iconEl += '</img></button></div>'; // and end tags
        console.log(iconEl);

        // append row to html file in column 2
        $('.column1').append(iconEl);
      }); // end of forEach
    }) // end of get
      .catch((err) => {
        console.log(err);
      }); // end of catch
  } // endof loadChoreIcons function

  // Loads child's name and puts in on the html page in a couple places
  //  (nav bar on the right, and Congratulations box)
  function greetChild(childId) {
    $.get(`api/children/${childId}`, (child) => {
      $('.greetname').text(child.name);
    });
  }

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
    let checkEl = '';
    let begRemEl = ''; // beginning of remove is always the same, too.
    let removeEl = '';

    // beginning of icon element is always the same.
    begIconEl = '<div class="col s4 left iconbutton"> '; // start div for column with this icon button
    begIconEl
      += '<button class="waves-effect waves-light hoverable z-depth-2 iconclass" '; // most of button tag

    // beginning of check mark button
    begChkEl = '<div class="col s4 left iconbutton"> '; // start div for column with this checkmark button
    begChkEl
      += '<button class="waves-effect waves-light hoverable z-depth-2 checkbutton" '; // most of checkmark button tag

    // beginning of remove button
    begRemEl = '<div class="col s4 left iconbutton"> '; // start div for column with this remove button
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
        iconEl += `data-id="${chore.ChoreId}"> `; // data id with chore id so we know what was clicked
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `src="assets/css/images/${chore.Chore.iconfile}" `; // source for image
        iconEl += `alt="${chore.Chore.title}">`; // alt for image
        iconEl += `${chore.Chore.title} - ${chore.Chore.points}`; // text for image
        iconEl += '</img></button></div>'; // and end tags
        // put icon in row
        rowEl += iconEl;

        // add checkmark button
        checkEl = begChkEl; // beginning
        checkEl += `data-id="${chore.ChoreId}"> `; // data id with chore id so we know what was clicked
        checkEl += '<img class="responsive-img" '; // start image tag with class
        checkEl += 'src="assets/css/images/check.png" '; // source for image
        checkEl += 'alt="checkmark">'; // alt for image
        checkEl += '</img></button></div>'; // end tags
        console.log(checkEl);
        // put checkmark in row
        rowEl += checkEl;

        // add remove button
        removeEl = begRemEl; // beginning
        removeEl += `data-id="${chore.ChoreId}"> `; // data id with chore id so we know what was clicked
        removeEl += '<img class="responsive-img" '; // start image tag with class
        removeEl += 'src="assets/css/images/remove.png" '; // source for image
        removeEl += 'alt="remove">'; // alt for image
        removeEl += '</img></button></div>'; // end tags
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
  } // endof loadAssignedChoreIcons function

  // Maura's experiment in trying to get click event to work
  // function getid(obj) {
  //   const id = $(obj).data("id");
  //   console.log(`ID in getid:${id}`);
  // }

  // Greet the child by name on the right side of the nav bar
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
}); // end of $(document).ready
