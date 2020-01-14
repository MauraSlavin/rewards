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
    // $(this).clone().appendTo('#reward-display');
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
});
