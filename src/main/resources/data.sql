DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS genres;

CREATE TABLE users (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  mail VARCHAR(200) NOT NULL,
  role VARCHAR(100)
);

INSERT INTO users (user_name, password, mail, role) VALUES
('Johny', '$2a$10$RYdWZBFYforLOPBGFiZtDuQgAMujisp222QHL.MHLNesWlGcIeueG', 'johny@admin.com', 'admin'),
('Wojtas', '$2a$10$RYdWZBFYforLOPBGFiZtDuQgAMujisp222QHL.MHLNesWlGcIeueG', 'wojtas@gmail.com', 'user');

CREATE TABLE genres (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO genres (name) VALUES
  ('Action'),
  ('RPG'),
  ('MMO');

create  table posts (
    id INT AUTO_INCREMENT  PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content VARCHAR(10000) NOT NULL,
    author_id INT NOT NULL, FOREIGN KEY (author_id) REFERENCES users(id),
    genre_id INT NOT NULL, FOREIGN KEY (genre_id) REFERENCES genres(id),
    publication_date DATE NOT NULL,
    is_published BOOLEAN NOT NULL
);

INSERT INTO posts (title, content, author_id, genre_id, publication_date, is_published) VALUES
    ('Dark Souls', '<h1>Pierwsza gra serii</h1> <p>Gra jest <b>bardzo trudna</b> Jest to istotna informacja.</p><h4>Nie polecana dla ludzi nerwowych</h4><br><video controls="controls" width="592" height="252"> <source src="https://vcze501.cda.pl/ItZnqjReUweldJukYoPldg/1610767729/lqee461a771d1e04ad2b49b6d4816a5257.mp4" type="video/mp4"></video>', 1, 2, TO_DATE('07-10-2011', 'DD-MM-YYYY'), TRUE),
    ('Gothic 2', '<h1>Fabularna gra akcji, kontynuacja gry Gothic stworzona przez studio Piranha Bytes w 2002 roku.</h1>', 1, 2, TO_DATE('29-11-2002', 'DD-MM-YYYY'), TRUE),
    ('Tibia', '<h1>Klasyka gier MMO</h1> <p>Kolega jest knajtem i wali z aksa.</p> <br><h4>A ja jestem druidem...<h4> ', 1, 3, TO_DATE('29-11-2002', 'DD-MM-YYYY'), TRUE),
    ('Uncharted', '<h1>Pierwsza gra serii</h1> <p>Pierwsza gra komputerowa z serii, zapowiedziano podczas prezentacji Sony na targach E3 2006 w Los Angeles. Jednak nazwe Uncharted ujawniono dopiero w lutym 2007 roku.</p> <br><h4>Premiera w Europie 7 grudnia 2007 roku.<h4> ', 1, 1, TO_DATE('19-11-2007', 'DD-MM-YYYY'), TRUE);

COMMIT;

