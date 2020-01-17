/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

let ptsBalance = 0; // Global because it's needed in more than one place

function loadRewardIcons() {
  console.log('Loading rewards icons. Only eligible ones will be clickable.');
  
  //  iconEl is the html elements for the icon
  let iconEl = '';

  // <div for the col>
  // flex is to space the row nicely;
  // todelete is to delete and re-build so the right icons are enabled.
  const colEl = '<div class="col s12 m2 todelete light-blue lighten-2"> <div class="row flex">';

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
function greetChildLoadRewards(childId) {
  $.get(`api/children/${childId}`, (child) => {
    // put child's name in wherever there's a greetname class
    $('.greetname').text(child.name);
    // put point balance in column 3 box
    ptsBalance = child.points; // ptsBalance is a global
    $('#ptbalance').text(ptsBalance);
  })
    .then(() => {
      loadRewardIcons();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Load rewards can't run until greetChild part is done,
//  so use .then in this function
greetChildLoadRewards(1);

// Put childrens' names and parents' names in dropdown list
loadChildrenNames();
loadParentNames();

// making sure the document is ready before I start binding click events
$(document).ready(() => {
  // click event for all of the rewards
  $(document).on('click', '.rewardBtn', function (e) {
    e.preventDefault();
    // since this is just copy and pasting I'm just going to change the html of the reward-display to the html of what was clicked
    // and change what needs to be changed

    // get id and points from icon clicked - we'll need that later to redeem the reward
    const id = $(this).data('id');
    const points = $(this).data('points');

    // add the clone after #reward-display, and add a class so we know it's the reward chosen
    const card = $(this).clone();
    $('#reward-display').html(card).find('.rewardBtn').addClass('rewardChosen');
    // remove a sibling that looks like it was added to the clone during the cloning process, but we don't need/want
    // and set the size of the cloned im
    $('.rewardChosen').find('img').siblings().remove();
    // save the chore id and points in the html for when the reward chosen is submitted, 
    // and enable the submit rewards button
    $('#reward-submit').attr('disabled', false).attr('data-id', id).attr('data-points', points);
    // Change the text of the now active button
    $('#choose-txt').text('Submit Your Reward!');

  });

  //
  // click event for the submit button
  $('#reward-submit').on('click', function (e) {
    e.preventDefault();

    // Now we need to get the chores id & points from the button in the reward display
    const btn = $(this)
      .parent()
      .parent()
      .find('.rewardBtn');
    const rewardId = $(btn[0]).data('id');
    const rewardPts = $(btn[0]).data('points');

    // write to usedpoints
    // decrement points (var & database)

    // Now that we have the id we need to make an axios call to our backend
    $.ajax({
      method: 'POST',
      url: `/api/usedpoints/1/${rewardId}`,
    })

    .then(() => {
      $.ajax({
        method: 'PUT',
        url: `/api/children/1/sub/${rewardPts}`,
      })

      .then(() => {
        // deduct points used to get the reward from the balance, and display on the html page
        ptsBalance -= rewardPts;
        $('#ptbalance').text(ptsBalance);
      })

      .then(() => {
        // remove reward icon chosen
        // ...and all reward icons, to re-build with correct ones enabled.
        $('.todelete').remove();
        // disable submit button (until another reward chosen)
        $('#reward-submit').attr('disabled', true);
        // and update text
        $('#choose-txt').text('Choose your reward.');
         // remove reward submitted as chosen on html page
        $('.rewardChosen').remove();
        loadRewardIcons(); // re-load icons with correct ones enabled.
      })

      .catch((err) => {
        // error handling
        console.log(err);
      }); // end of .then chain started with ajax PUT call to route api/children/1/sub/rewardspts  
    }); // end of .then chain started with ajax POST call to route api/usedpoints/1/rewardId
  }); // end of click on #reward-submit
}); // end of document ready
