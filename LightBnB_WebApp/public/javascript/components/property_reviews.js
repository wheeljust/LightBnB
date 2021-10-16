$(() => {
  const $propertyReviews = $(`
    <section class="property-reviews" id="property-reviews">
      Loading...
    </section>
  `);

  window.$propertyReviews = $propertyReviews;

  // declaring an empty object to add methods onto
  window.propertyReviews = {}

  function clearReviews() {
    $propertyReviews.empty();
  }

  window.propertyReviews.clearReviews = clearReviews;

  function addReviews(reviews) {
    clearReviews();
    $propertyReviews.append(`<h3>Reviews for ${reviews[0].property_title}</h3>`);
    const reviewHtml = reviews.map(review => {
      const { id, review_rating, review_text, name, start_date, end_date }  = review;
      return `<article class="property-review">
        <section class="property-review__details">
          <h3>${review_rating}/5 stars</h3>
          <p>Review done by: ${name}</p>
          <p>Stay from ${moment(start_date).format('ll')} to ${moment(end_date).format('ll')}</p>
          <p>${review_text}</p> 
        </section>
      </article>`
    }).join('');
    $propertyReviews.append(reviewHtml);
    $propertyReviews.append(`<span class="property-reviews__return" href="#">Return to Listings</span>`);
  
    $(document).on('click', '.property-reviews__return', function() {
      views_manager.show('none');
      views_manager.show('listings');
    })
  }

  window.propertyReviews.addReviews = addReviews;
})