-- Show all details about properties located in a city including their average rating --
SELECT
  properties.*,
  avg(property_reviews.rating) AS average_rating
FROM
  properties
  JOIN property_reviews ON property_id = properties.id
WHERE
  city LIKE '%ancouv%'
  AND cost_per_night > 40000
  AND cost_per_night < 50000
  AND owner_id = 747
GROUP BY
  properties.id
HAVING
  avg(property_reviews.rating) >= 4
ORDER BY
  cost_per_night
LIMIT
  10;