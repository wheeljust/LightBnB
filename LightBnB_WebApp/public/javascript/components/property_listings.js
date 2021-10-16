$(() => {

  const $propertyListings = $(`
  <section class="property-listings" id="property-listings">
      <p>Loading...</p>
    </section>
  `);
  window.$propertyListings = $propertyListings;

  window.propertyListings = {};

  function addListing(listing) {
    $propertyListings.append(listing);
  }
  function clearListings() {
    $propertyListings.empty();
  }
  window.propertyListings.clearListings = clearListings;

  function addProperties(properties, isReservation = false) {
    // if it's a reservation, we don't want to clear the listings a second time in the addProperties function call
    if (!isReservation) {
      clearListings();
    }
    // check for user login
    getMyDetails()
    .then()

    for (const propertyId in properties) {
      const property = properties[propertyId];
      const listing = propertyListing.createListing(property, isReservation);
      addListing(listing);
    }
    
    if (isReservation) {
      $('.update-button').on('click', function() {
        const idData = $(this).attr('id').substring(16);
        getIndividualReservation(idData)
          .then(data => {
            views_manager.show("updateReservation", data);       
          });       
      })
      $('.delete-button').on('click', function() {
        const idData = $(this).attr('id').substring(16);
        deleteReservation(idData);
        $currentReservation = $(this).closest('article');
        $currentReservation.hide('slow', function(){ $currentReservation.remove(); });;
      })
      $('.add-review-button').on('click', function() {
        const idData = $(this).attr('id').substring(11);
        getIndividualReservation(idData)
        .then(data => {
          console.log(data);
          views_manager.show("newReview", data);     
        });  
      })
    }
  }
  window.propertyListings.addProperties = addProperties;

});