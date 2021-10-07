-- GET all user login detail for one specifc user, query by email --

SELECT
  id,
  name,
  email,
  password
FROM
  users
WHERE
  email = 'tristanjacobs@gmail.com';