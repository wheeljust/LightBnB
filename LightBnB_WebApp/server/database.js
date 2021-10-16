const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// USERS

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryParams = [email];
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  
  return pool.query(queryString, queryParams)
    .then(result => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryParams = [id];
  const queryString = `SELECT * FROM users WHERE id = $1;`;

  return pool.query(queryString, queryParams)
    .then(result => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryParams = [
    user.name,
    user.email,
    user.password
  ];

  let queryString = `
    INSERT INTO 
      users (name, email, password)
    VALUES
      ($1, $2, $3)
    RETURNING *;`;
  
  return pool.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// RESERVATIONS

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getFulfilledReservations = function(guest_id, limit = 10) {
  const queryParams = [guest_id, limit];
  let queryString = `
    SELECT
      properties.*, reservations.*, avg(rating) AS average_rating, count(rating) as review_count
    FROM 
      reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE
      reservations.guest_id = $1
      AND reservations.end_date < NOW() :: date
    GROUP BY
      properties.id,
      reservations.id
    ORDER BY
      reservations.start_date
    LIMIT
      $2;`;
  
  return pool.query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => {
      console.log(err.message);
    });
};
exports.getFulfilledReservations = getFulfilledReservations;

/**
 * Gets upcoming reservations for one specific guest_id
 * @param {string} guest_id the id of the user
 * @param {integer} limit number of results to return, default is 10
 * @return {Promise<[{}]>} a promise to the reservation.
 */
 const getUpcomingReservations = function(guest_id, limit = 10) {
  const queryParams = [guest_id, limit];
  let queryString = `
    SELECT
      properties.*, reservations.*, avg(rating) AS average_rating, count(rating) AS review_count
    FROM 
      reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE
      reservations.guest_id = $1
      AND reservations.start_date > now()::date
    GROUP BY
      properties.id,
      reservations.id
    ORDER BY
      reservations.start_date
    LIMIT
      $2;`;
  
  return pool.query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => {
      console.log(err.message);
    });
}
exports.getUpcomingReservations = getUpcomingReservations;

/**
 * 
 * @param {integer} reservationId 
 * @returns {Promise<{}>} A promise to the reservation
 */
const getIndividualReservation = function(reservationId) {
  const queryParams = [reservationId];
  const queryString = `SELECT * FROM reservations WHERE reservations.id = $1;`

  return pool.query(queryString, queryParams)
    .then(result => result.rows[0])
    .catch(err => {
      console.log(err.message);
    });
}
exports.getIndividualReservation = getIndividualReservation;

/**
 * Adds a reservation to the database for a specific user
 * @param {{}} reservation an object containing the reservation details
 * @returns {Promise<{}>} A promise to the reservation
 */
const addReservation = function(reservation) {
  const queryParams = [
    reservation.start_date,
    reservation.end_date,
    reservation.property_id,
    reservation.guest_id
  ];

  const queryString = `
    INSERT INTO reservations 
      (start_date, end_date, property_id, guest_id)
    VALUES 
      ($1, $2, $3, $4) 
    RETURNING *;`;

  return pool.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => {
      console.log(err.message);
    });
}
exports.addReservation = addReservation;

/**
 * Updates an existing reservation with new start or end dates (or both)
 * @param {{}} newReservationData an object containing reservation_id and new reservation date(s)
 * @returns {Promise<{}>} A promise to the reservation
 */
const updateReservation = function(newReservationData) {
  const queryParams = [];
  let queryString = `UPDATE reservations SET `;

  if (newReservationData.start_date) {
    queryParams.push(`${newReservationData.start_date}`);
    queryString += `start_date = $${queryParams.length}`;
  }

  if (newReservationData.end_date) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newReservationData.end_date}`);
    queryString += `end_date = $${queryParams.length}`;
  }

  queryParams.push(`${newReservationData.reservation_id}`);
  queryString += ` WHERE id = $${queryParams.length} RETURNING *;`

  return pool.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
}
exports.updateReservation = updateReservation;

/**
 * Deletes and existing reservation from the database
 * @param {integer} reservationId
 * @returns {Promise<{}>} A promise to the reservation
 */
 const deleteReservation = function(reservationId) {
  const queryParams = [reservationId];
  const queryString = `DELETE FROM reservations WHERE id = $1`;
  return pool.query(queryString, queryParams)
    .then(() => console.log("Successfully deleted!"))
    .catch(() => console.error(err));
}
exports.deleteReservation = deleteReservation;

/// PROPERTIES

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {integer} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  
  let queryString = `
    SELECT
      properties.*,
      avg(property_reviews.rating) AS average_rating,
      count(property_reviews.rating) AS review_count
    FROM
      properties
      LEFT JOIN property_reviews ON property_id = properties.id `;
  
  if (options.city) {
    // remove first and last letter to avoid search issues
    queryParams.push(`%${options.city.substr(1, options.city.length - 2)}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    costInCents = options.minimum_price_per_night * 100;
    queryParams.push(`${costInCents}`);
    (queryParams.length > 1) ? queryString += `AND ` : queryString += `WHERE `;
    queryString += `cost_per_night > $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    costInCents = options.maximum_price_per_night * 100;
    queryParams.push(`${costInCents}`);
    (queryParams.length > 1) ? queryString += `AND ` : queryString += `WHERE `;
    queryString += `cost_per_night < $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    (queryParams.length > 1) ? queryString += `AND ` : queryString += `WHERE `;
    queryString += `owner_id = $${queryParams.length} `;
  }

  queryString += `GROUP BY properties.id `

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }
  
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night LIMIT $${queryParams.length};`;

  return pool.query(queryString, queryParams)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryParams = [
    property.owner_id, 
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];
  
  let queryString = `
    INSERT INTO properties (
      owner_id, 
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    ) 
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING * ;`;

  return pool.query(queryString, queryParams)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
  
};
exports.addProperty = addProperty;

// REVIEWS

const getReviewsByProperty = function(propertyId) {
  const queryString = `
    SELECT
      property_reviews.id,
      property_reviews.rating AS review_rating,
      property_reviews.message AS review_text,
      users.name,
      properties.title AS property_title,
      reservations.start_date,
      reservations.end_date
    FROM
      property_reviews
      JOIN reservations ON reservations.id = property_reviews.reservation_id
      JOIN properties ON properties.id = property_reviews.property_id
      JOIN users ON users.id = property_reviews.guest_id
    WHERE
      properties.id = $1
    ORDER BY
      reservations.start_date DESC;`;

  const queryParams = [propertyId];

  return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.log(err.message);
    });
}

exports.getReviewsByProperty = getReviewsByProperty;