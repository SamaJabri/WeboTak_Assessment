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

//setupDb();

const addUser = async (req, res) => {
  const { name } = req.body;

  // Check if user already exists
  const doesUserExist = await db.oneOrNone(
    `SELECT * FROM users WHERE name = $1;`,
    name
  );

  if (doesUserExist) {
    return res.status(409).json({ msg: "Username exists" });
  } else {
    const newUser = await db.one(
      `INSERT INTO users (name) VALUES ($1) RETURNING *;`,
      name
    );

    return res.status(201).json(newUser);
  }
};

const getQuestionsForUser = async (req, res) => {
  const { id } = req.params;
  let finalResponse = [];

  // Get the questions that user already answered so we don't repeat them
  const userAnsweredQuestions = await db.manyOrNone(
    `SELECT question_id FROM users_questions WHERE user_id = $1;`,
    Number(id)
  );

  // Get the unanswered questions
  let userUnansweredQuestions;
  if (userAnsweredQuestions.length === 0) {
    // If the userAnsweredQuestions array is empty, get all questions
    userUnansweredQuestions = await db.manyOrNone(`SELECT * FROM questions;`);
  } else {
    // Get the unanswered questions
    userUnansweredQuestions = await db.manyOrNone(
      `SELECT * FROM questions WHERE id != ANY($1);`,
      [userAnsweredQuestions.map(({ question_id }) => question_id)]
    );
  }

  if (userUnansweredQuestions.length > 0) {
    const finalResponseContent = userUnansweredQuestions.map(
      async ({ id, text }) => {
        // Get the unanswered questions options
        const unansweredQuestionOptions = await db.manyOrNone(
          `SELECT id, answer FROM answers WHERE question_id = $1;`,
          id
        );

        return {
          id: id,
          questionText: text,
          answerOptions: unansweredQuestionOptions,
        };
      }
    );

    finalResponse = await Promise.all(finalResponseContent);

    return res.status(200).json(finalResponse);
  } else {
    return res.status(404).json({ msg: "You answered all the questions!" });
  }
};

const addQuestionAnswer = async (req, res) => {
  let { userId, questionId, optionId } = req.body;

  try {
    const updatedAnswer = await db.oneOrNone(
      `UPDATE answers SET numOfAnswers = numOfAnswers + 1 WHERE id = $1 AND question_id = $2 RETURNING *;`,
      [optionId, questionId]
    );

    if (updatedAnswer === null) {
      return res.status(404).json({ msg: "Answer ID not found" });
    } else if (updatedAnswer) {
      const newAnswer = await db.one(
        `INSERT INTO users_questions (user_id, question_id) VALUES ($1, $2) RETURNING *;`,
        [userId, questionId]
      );

      return res.status(201).json({ msg: "Answer submitted successfully" });
    } else {
      return res
        .status(500)
        .json({ msg: "Something went wrong with the update" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong", details: error });
  }
};

const addQuestion = async (req, res) => {
  const { question } = req.body;

  const doesQuestionExist = await db.oneOrNone(
    `SELECT text FROM questions WHERE text = $1;`,
    question.toUpperCase()
  );

  return doesQuestionExist
    ? res.status(409).json({ msg: "Question already exists" })
    : res.status(200).json({ msg: "Valid Question" });
};

const addFullQuestion = async (req, res) => {
  const { question, answerOptions } = req.body;
  let newOption;

  try {
    const newQuestion = await db.one(
      `INSERT INTO questions (text) VALUES ($1) RETURNING *;`,
      question.toUpperCase()
    );

    answerOptions.map(async (answer) => {
      newOption = await db.one(
        `INSERT INTO answers (question_id, answer) VALUES ($1, $2) RETURNING *;`,
        [newQuestion.id, answer.toUpperCase()]
      );
    });

    return res.status(200).json({ msg: "Question added successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong", details: error });
  }
};

const deleteFullQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete options associated with the question
    await db.none(`DELETE FROM answers WHERE question_id = $1;`, id);

    await db.none(`DELETE FROM users_questions WHERE question_id = $1;`, id);

    await db.none(`DELETE FROM questions WHERE id = $1;`, id);

    return res.status(200).json({ msg: "Question deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to delete question", details: error });
  }
};

const getQuestionsAnalysis = async (req, res) => {
  let finalResponse = [];

  const questions = await db.manyOrNone(`SELECT * FROM questions`);

  if (questions) {
    const finalResponseContent = questions.map(async (question) => {
      const options = await db.many(
        `SELECT answer, numOfAnswers FROM answers WHERE question_id = $1;`,
        question.id
      );

      return {
        id: question.id,
        questionText: question.text,
        answerOptions: options,
      };
    });

    finalResponse = await Promise.all(finalResponseContent);
    return res.status(200).json(finalResponse);
  } else {
    return res.status(404).json({ msg: "No questions found" });
  }
};

module.exports = {
  addUser,
  getQuestionsForUser,
  addQuestionAnswer,
  addQuestion,
  addFullQuestion,
  deleteFullQuestion,
  getQuestionsAnalysis,
};
