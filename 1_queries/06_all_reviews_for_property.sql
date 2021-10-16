SELECT
  property_reviews.id,
  property_reviews.rating,
  property_reviews.message,
  users.name,
  properties.title,
  reservations.start_date,
  reservations.end_date
FROM
  property_reviews
  JOIN reservations ON reservations.id = property_reviews.reservation_id
  JOIN properties ON properties.id = property_reviews.property_id
  JOIN users ON users.id = property_reviews.guest_id
WHERE
  properties.id = 225
ORDER BY
  reservations.start_date DESC;