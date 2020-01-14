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
    const card = this;
    console.log(card);
    $('#reward-display').html(card);
  });
  // click event for the submit button
  $('#reward-submit').on('click', function (e) {
    e.preventDefault();
    console.log(this);
  });
});
