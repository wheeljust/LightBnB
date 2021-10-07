-- List the most visited cities --
SELECT
  properties.city,
  COUNT(reservations.*) AS total_reservations
FROM
  reservations
  JOIN properties ON properties.id = property_id
GROUP BY
  properties.city
ORDER BY
  total_reservations DESC;