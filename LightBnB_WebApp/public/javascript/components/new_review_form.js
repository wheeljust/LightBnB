$(() => {
  const $newReviewForm = $(`
    <form>
      <textarea id="new-review-body" rows="4 cols="50"></textarea>
      <label for="new-review-rating">Select a rating:</label>
      <select name="rating" id="new-review-rating">
        <option value="">-- Select a rating --</option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>
      <div id="datatag" class="hidden"></div>
      <button type="submit">Submit Review</button>
      <a id="reservation-form__cancel" href="#">Cancel</a>
    </form>
  `)

  window.$newReviewForm = $newReviewForm;

  $newReviewForm.on('submit', function(event) {
    event.preventDefault();
    const reviewBody = $('#new-review-body').val();
    const reviewRating = $('#new-review-rating').val();
    const reservationId = $('#datatag h4').text();
    let errorMessage = "";

    if (!reviewBody) {
      errorMessage = "Please provide some details about your stay before submitting your review";
    }

    if (!reviewRating) {
      errorMessage = "Please provide a rating before submitting your review";
    }
    
    // clear our review fields
    $('#new-review-rating').val("");
    $("#new-review-body").val("");

    if (reviewRating && reviewBody && !errorMessage) {
      getIndividualReservation(reservationId)
      .then(data => {
        const dataObj = {...data, reservation_id: reservationId, message: reviewBody, rating: reviewRating};
        submitReview(dataObj)
        .then(result => {
          views_manager.show('listings');
        });
      })
    } else {
      const dataObj = {
        id: $(this).find('#datatag-reservation-id').text(),
        start_date: $(this).find('#datatag-start-date').text(),
        end_date: $(this).find('#datatag-end-date').text(),
        property_id: $(this).find('#datatag-property-id').text(),
        error_message: errorMessage
      }
      views_manager.show('newReview', dataObj);
    }
  })

});