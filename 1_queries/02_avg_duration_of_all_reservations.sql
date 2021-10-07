-- Get the average duration of all reservations --
SELECT
  avg(end_date - start_date) AS average_duration
FROM
  reservations;