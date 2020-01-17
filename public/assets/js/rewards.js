/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

// testing if the page is linked to the html page
console.log('hello world');
let ptsBalance = 0; // Global because it's needed in more than one place

function loadRewardIcons() {
  //  iconEl is the html elements for the icon
  let iconEl = '';

  // <div for the col>
  const colEl = '<div class="col s12 m2"><div class="row flex">';

  // button (gets closed after data-id added & (conditionally) a "disabled")
  const btnEl = '<button class="waves-effect waves-light hoverable z-depth-2 rewardBtn" ';

  $.get('api/rewards', (rewards) => {
    //  For each Chore, build an html icon (w/points),
    rewards.forEach((reward) => {
      // customize the image part of the icon element w/image, title and points; and append
      iconEl = colEl; // column div
      // button tag & data-id
      iconEl += btnEl; // most of button tag. close after data-id (& disabled, if needed) added
      iconEl += `data-id="${reward.id}" `; // data id with chore id so we know what was clicked
      iconEl += `data-points="${reward.points}" `; // data points with reward points so we know how many points to deduct if chosen.
      // if you don't have enough points for this reward, the button is disabled
      // close button tag here
      if (reward.points > ptsBalance) {
        iconEl += 'disabled="disabled"> ';
      } else {
        iconEl += '> ';
      }
      iconEl += '<img class="responsive-img" '; // start image tag w/class
      iconEl += 'class="icons" '; // class
      iconEl += `src="assets/css/images/${reward.iconfile}" `; // source for image
      iconEl += `alt="${reward.title}">`; // alt for image
      iconEl += `${reward.title} - ${reward.points}`; // text for image if we use title, too
      iconEl += '</img></button></div></div>'; // and end tags

      // append row to html file
      $('.rewardicons').append(iconEl);
    }); // end of forEach
  }) // end of get
    .catch((err) => {
      console.log(err);
    }); // end of catch
} // endof loadRewardIcons function

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

greetChild(1);
loadChildrenNames();
loadParentNames();
loadRewardIcons();

// making sure the document is ready before I start binding click events
$(document).ready(() => {
  // click event for all of the rewards
  $(document).on('click', '.rewardBtn', function (e) {
    e.preventDefault();
    // since this is just copy and pasting I'm just going to change the html of the reward-display to the html of what was clicked
    const card = $(this).clone();
    $('#reward-display').html(card);
    $('.rewardBtn').attr('disabled', true);
    $('#reward-submit').attr('disabled', false);
    $('#choose-txt').text('Submit Your Reward!');
  });
  // click event for the submit button
  $('#reward-submit').on('click', function (e) {
    e.preventDefault();
    // This is to show what is clicked on
    console.log('reward submit clicked');

    // Now we need to get the id of the button in the reward display
    const obj = $(this)
      .parent()
      .parent()
      .find('.rewardBtn');

    const rewardId = $(obj[0]).data('id');
    const rewardPts = -$(obj[0]).data('points');
    console.log(`id: ${rewardId}`);
    console.log(`pts: ${rewardPts}`);

    // write to usedpoints
    // decrement points (var & database)

    // Now that we have the id we need to make an axios call to our backend
    $.ajax({
      method: 'POST',
      url: `/api/usedpoints/1/${rewardId}`,
      responseType: 'text',
    })
      .then(() => {
        $.ajax({
          method: 'PUT',
          url: `/api/children/1/${rewardPts}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // rewardsPts is a negative number - amount reward "costs"
    ptsBalance += rewardPts;
    $('#ptsearned').text(ptsBalance);
    // }).then(function (response) {
    //   console.log(response);
    // });
  });
});
