/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

// testing if the page is linked to the html page
console.log('hello world');

// making sure the document is ready before I start binding click events
$(document).ready(() => {
  // click event for all of the rewards
  $(document).on('click', '.rewardBtn', function (e) {
    e.preventDefault();
    // since this is just copy and pasting I'm just going to change the html of the reward-display to the html of what was clicked
    const card = $(this).clone();
    console.log(card);
    $('#reward-display').html(card);
  });
  // click event for the submit button
  $('#reward-submit').on('click', function (e) {
    e.preventDefault();
    // This is to show what is clicked on
    console.log(this);
    // Now we need to get the id of the button in the reward display
    const rwdDis = $('#reward-display');
    const button = $('button');
    $(rwdDis).find(button).each(function () {
      console.log(this.id);
      // Now that we have the id we need to make an axios call to our backend
      axios({
        method: 'post',
        url: `/api/usedpoints/1/${this.id}`,
        responseType: 'text',
      })
        .then(function (response) {
          console.log(response);
        });
    });
  });
  function loadRewardIcons() {
    //  iconEl is the html elements for the icon
    let iconEl = '';
    let begIconEl = ''; // the beginning is always the same

    // beginning of icon element is always the same.
    // <div for the col>
    begIconEl = '<div class="col s12 m4 left iconbutton icons"> '; // start div for column with this icon button
    // <button>
    begIconEl += '<button class="waves-effect waves-light hoverable z-depth-2 '; // most of button tag. close after data-id added

    $.get('api/rewards', (rewards) => {
      //  For each Chore, build an html icon (w/points),
      rewards.forEach((reward) => {
        // customize the image part of the icon element w/image, title and points; and append
        iconEl = begIconEl; // beginning
        iconEl += `data-id="${reward.id}"> `; // data id with chore id so we know what was clicked
        iconEl += '<img class="responsive-img" '; // start image tag w/class
        iconEl += `src="assets/css/images/${reward.iconfile}" `; // source for image
        iconEl += `alt="${reward.title}">`; // alt for image
        iconEl += `${reward.title} - ${reward.points}`; // text for image if we use title, too
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
});
