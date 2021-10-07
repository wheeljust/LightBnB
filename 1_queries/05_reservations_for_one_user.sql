-- Show all past reservations for a user who is logged in --
SELECT
  properties.*,
  reservations.*,
  avg(rating) AS average_rating
FROM
  reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE
  reservations.guest_id = 1
  AND reservations.end_date < NOW() :: date
GROUP BY
  properties.id,
  reservations.id
ORDER BY
  reservations.start_date
LIMIT
  10;