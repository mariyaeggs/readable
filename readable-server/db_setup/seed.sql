SELECT * FROM BOOKS;
DROP TABLE BOOKS;

CREATE TABLE `BOOKS` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `isbn` varchar(13) binary NOT NULL default '',
  `title` varchar(255) default NULL,
  `author` varchar(255) default NULL,
  `publication_year` int(10) unsigned default NULL,
  `publisher` varchar(255) default NULL,
  `image_url` varchar(255) binary default NULL,
  `Image_URL_M` varchar(255) binary default NULL,
  `Image_URL_L` varchar(255) binary default NULL,
  `shelf` int NOT NULL,
  PRIMARY KEY  (`book_id`)
);

INSERT INTO BOOKS (isbn, title, author, publication_year, publisher, image_url, Image_URL_M, Image_URL_L, shelf)
VALUES
('0195153448','Classical Mythology','Mark P. O. Morford',2002,'Oxford University Press','http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg', 1),
('0002005018','Clara Callan','Richard Bruce Wright',2001,'HarperFlamingo Canada','http://images.amazon.com/images/P/0002005018.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg', 1),
('0060973129','Decision in Normandy','Carlo D\'Este',1991,'HarperPerennial','http://images.amazon.com/images/P/0060973129.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0060973129.01.MZZZZZZZ.jpg','http://images.amazon.com/images/P/0060973129.01.LZZZZZZZ.jpg', 2),
('0374157065','Flu: The Story of the Great Influenza Pandemic of 1918 and the Search for the Virus That Caused It','Gina Bari Kolata',1999,'Farrar Straus Giroux','http://images.amazon.com/images/P/0374157065.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0374157065.01.MZZZZZZZ.jpg','http://images.amazon.com/images/P/0374157065.01.LZZZZZZZ.jpg', 2),
('0393045218','The Mummies of Urumchi','E. J. W. Barber',1999,'W. W. Norton &amp; Company','http://images.amazon.com/images/P/0393045218.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0393045218.01.MZZZZZZZ.jpg','http://images.amazon.com/images/P/0393045218.01.LZZZZZZZ.jpg', 3),
('0399135782','The Kitchen God\'s Wife','Amy Tan',1991,'Putnam Pub Group','http://images.amazon.com/images/P/0399135782.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0399135782.01.MZZZZZZZ.jpg','http://images.amazon.com/images/P/0399135782.01.LZZZZZZZ.jpg', 3),
('0425176428','What If?: The World\'s Foremost Military Historians Imagine What Might Have Been','Robert Cowley',2000,'Berkley Publishing Group','http://images.amazon.com/images/P/0425176428.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0425176428.01.MZZZZZZZ.jpg','http://images.amazon.com/images/P/0425176428.01.LZZZZZZZ.jpg', 2),
('0671870432','PLEADING GUILTY','Scott Turow',1993,'Audioworks','http://images.amazon.com/images/P/0671870432.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0671870432.01.MZZZZZZZ.jpg','http://images.amazon.com/images/P/0671870432.01.LZZZZZZZ.jpg', 1),
('0679425608','Under the Black Flag: The Romance and the Reality of Life Among the Pirates','David Cordingly',1996,'Random House','http://images.amazon.com/images/P/0679425608.01.THUMBZZZ.jpg','http://images.amazon.com/images/P/0679425608.01.MZZZZZZZ.jpg','http://images.amazon.com/images/P/0679425608.01.LZZZZZZZ.jpg', 3);

SELECT * FROM BOOKS;



CREATE TABLE BX_BOOKS (
  'ISBN', 'Book-Title', 'Book-Author', 'Year-Of-Publication', 'Publisher',
       'Image-URL-S', 'Image-URL-M', 'Image-URL-L')
