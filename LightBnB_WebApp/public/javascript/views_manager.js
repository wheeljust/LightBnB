$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item, data = '') {
    $newPropertyForm.detach();
    $propertyListings.detach();
    $searchPropertyForm.detach();
    $logInForm.detach();
    $signUpForm.detach();
    $newReservationForm.detach();
    $updateReservationForm.detach();
    $propertyReviews.detach();
    $newReviewForm.detach();
    $('#reservation-details').detach();
    $('#review-details').detach();
    $('#update-error-message').detach();
    $('#review-error-message').detach();
    
    let datatag = "";

    switch (item) {
      case 'listings':
        $propertyListings.appendTo($main);
        break;
      case 'newProperty':
        $newPropertyForm.appendTo($main);
        break;
      case 'searchProperty':
        $searchPropertyForm.appendTo($main);
        break;
      case 'logIn':
        $logInForm.appendTo($main);
        break;
      case 'signUp':
        $signUpForm.appendTo($main);
        break;
      case 'newReview':
        dataTag = `
          <span id="datatag-reservation-id">${data.id}</span>
          <span id="datatag-start-date">${data.start_date}</span>
          <span id="datatag-end-date">${data.end_date}</span>
          <span id="datatag-property-id">${data.property_id}</span>
          `;
        const reviewDetails = `
          <div id="review-details">
            <h3>Your Past Reservation Details</h3>
            <h4>Start date: ${moment.utc(data.start_date).format("MMMM DD, YYYY")}</h4>
            <h4>End date: ${moment.utc(data.end_date).format("MMMM DD, YYYY")}</h4>
          </div>
          `;

        const reviewErrorMessage = data.error_message ? `<h4 id="review-error-message">${data.error_message}</h4>` : ``;

        $(reviewDetails).appendTo($main);
        $newReviewForm.appendTo($main);
        $("#datatag").empty();
        $(dataTag).appendTo("#datatag");
        $(reviewErrorMessage).appendTo($main);
        if (reviewErrorMessage) {
          setTimeout(() => {
            $('#review-error-message').remove();
          }, 2000);
        }
        break;
      case 'showReviews':
        getReviewsByProperty(data)
          .then(reviews => propertyReviews.addReviews(reviews))
          $propertyReviews.appendTo($main);
        break;
      case 'newReservation':
        dataTag = `<h4>${data}</h4>`;
        $newReservationForm.appendTo($main);
        $("#datatag").empty();
        $(dataTag).appendTo("#datatag");
        break;
      case 'updateReservation':
        dataTag = `
          <span id="datatag-reservation-id">${data.id}</span>
          <span id="datatag-start-date">${data.start_date}</span>
          <span id="datatag-end-date">${data.end_date}</span>
          <span id="datatag-property-id">${data.property_id}</span>
        `;

        const reservationDetails = `
          <div id="reservation-details">
            <h3>Reservation Details</h3>
            <h4>Start date: ${moment.utc(data.start_date).format("MMMM DD, YYYY")}</h4>
            <h4>End date: ${moment.utc(data.end_date).format("MMMM DD, YYYY")}</h4>
          </div>
        `;

        const updateErrorMessage = data.error_message ? `<h4 id="update-error-message">${data.error_message}</h4>` : ``;

        $(reservationDetails).appendTo($main);
        $updateReservationForm.appendTo($main);
        $("#datatag").empty();
        $(dataTag).appendTo("#datatag");
        $(updateErrorMessage).appendTo($main);
        if (updateErrorMessage) {
          setTimeout(() => {
            $('#update-error-message').remove();
          }, 2000);
        }
        break;
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('listings');
        }, 2000);

        break;
      }
    }
  }
  
});