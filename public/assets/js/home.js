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


  // This function gets chore icons from the database, and updates the html page
  function loadChoreIcons() {
    //  iconEl is the html elements for the icon
    let iconEl = '';
    let begIconEl = ''; // the beginning is always the same

    // beginning of icon element is always the same.
    // <div for the col>
    begIconEl += '<div class="card grey lighten-2">';
    // most of button tag. close after data-id added
    begIconEl
      += '<div class="disabled" ';

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
        iconEl += '</img></div></div>'; // and end tags

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
  function greetChild(kidId) {
    $.get(`api/kids/${kidId}`, (kid) => {
      // put child's name in wherever there's a greetname class
      $('.greetname').text(kid.name);
      // put point balance in column 3 box
      ptsBalance = kid.points; // ptsBalance is a global
      $('#ptbalance').text(ptsBalance);
    });
    // partial build for second child
    $.get('api/kids/2', (kid) => {
      // put child's name in wherever there's a greetname class
      $('.greetname2').text(kid.name);
      // put point balance in column 3 box
      ptsBalance = kid.points; // ptsBalance is a global
      $('#ptbalance2').text(ptsBalance);
    });
  }

  // This function gets children's names from the database,
  // and uses them for the dropdown list on the nav bar
  function loadChildrenNames() {
    // Get the children's names (the emails are available here, too)
    $.get('api/kids', (kids) => {
      let kidLink = ''; // will be used for the html for the link

      // for each child, add a link to the dropdown list in the nav bar
      kids.forEach((kid) => {
        kidLink = `<li><a href="kid.html">${kid.name}</a></li>`;
        $('.kidlinks').append(kidLink);
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
        parentLink = `<li><a href="parent.html">${parent.name}</a></li>`;
        $('.parentlinks').append(parentLink);
      }); // end of forEach
    }); // end of get
  } // endof loadParentsNames function


  //
  //
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
  } // end of renderChildPage function

  // Get data from database and dynamically create html before showing the user the page.
  renderChildPage();
}); // end of $(document).ready
