-- USERS --
INSERT INTO
  users (name, email, password) 
VALUES
  ('Jerry Fields', 'j.fields@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Maisey May', 'month_of_may@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Josh Anderson', 'andersj@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Sue Luna', 'susan.luna@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Bret Hart', 'wrestle.mainia12@outlook.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- PROPERTIES --
INSERT INTO
  properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES
  (
    4,
    'Sunny Corner',
    'description filler',
    'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',
    210,
    1,
    2,
    3,
    'Canada',
    '536 Namsub Highway',
    'Sotboske',
    'Quebec',
    'G3E 1V5'
  ),
  (
    5,
    'Slam Town Slammer',
    'description filler',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    349,
    3,
    6,
    8,
    'Canada',
    '401 Garrett Circle',
    'Burnaby',
    'British Columbia',
    'V3L 3S1'
  ),
  (
    1,
    'Farmers Escape',
    'description filler',
    'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg',
    175,
    6,
    3,
    4,
    'Canada',
    '307 Back Circle Way',
    'Saskatoon',
    'Saskatchewan',
    'S7K 8P2'
    );

-- RESERVATIONS --
INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 3, 3),
  ('2020-05-09', '2020-05-12', 2, 4),
  ('2020-08-23', '2020-08-31', 2, 3),
  ('2019-12-20', '2019-12-28', 1, 2),
  ('2021-03-16', '2021-03-18', 3, 5);

-- PROPERTY_REVIEWS --
INSERT INTO
  property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (3, 3, 1, 3, 'ok rating message'),
  (4, 2, 2, 4, 'good rating message'),
  (3, 2, 3, 5, 'great rating message'),
  (2, 1, 4, 1, 'bad rating message'),
  (5, 3, 5, 4, 'good rating message');