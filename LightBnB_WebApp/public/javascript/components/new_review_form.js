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
      <button type="submit">Submit</button>
    </form>
  `)

  window.$newReviewForm = $newReviewForm;
});