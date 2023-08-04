const pgPromise = require("pg-promise");
require("dotenv").config();

const db = pgPromise()(process.env.POSTGRES_URL || "");

const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE users (
      id SERIAL NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `);

  await db.none(`
    DROP TABLE IF EXISTS questions CASCADE;

    CREATE TABLE questions (
      id SERIAL NOT NULL PRIMARY KEY,
      text VARCHAR(255) NOT NULL
    );
  `);

  await db.none(`
    DROP TABLE IF EXISTS users_questions CASCADE;

    CREATE TABLE users_questions (
      id SERIAL NOT NULL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (question_id) REFERENCES questions (id),
      UNIQUE (user_id, question_id)
    );
  `);

  await db.none(`
    DROP TABLE IF EXISTS answers CASCADE;

    CREATE TABLE answers (
      id SERIAL NOT NULL PRIMARY KEY,
      question_id INTEGER NOT NULL,
      answer VARCHAR(255) NOT NULL,
      numOfAnswers INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (question_id) REFERENCES questions (id)
    );
  `);
};

const execute = async () => {
  try {
    await setupDb();
    console.log("Database created successfully!");
  } catch (err) {
    console.log("Something went wrong, please try again!\n", err);
  }
};

execute();
