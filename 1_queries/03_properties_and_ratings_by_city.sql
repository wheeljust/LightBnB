-- Show all details about properties located in a city including their average rating --
SELECT
  properties.*,
  avg(property_reviews.rating) AS average_rating
FROM
  properties
  JOIN property_reviews ON property_id = properties.id
WHERE
  city like '%ancouv%'
GROUP BY
  properties.id
HAVING
  avg(property_reviews.rating) >= 4
ORDER BY
  cost_per_night
LIMIT
  10;