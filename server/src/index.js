const express = require("express");
const cors = require("cors");
const {
  addUser,
  getQuestionsForUser,
  addQuestionAnswer,
  addQuestion,
  addFullQuestion,
  deleteFullQuestion,
  getQuestionsAnalysis,
} = require("./controllers/controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/* For user */
// Store username
app.post("/user", addUser);

// Get questions for user
app.get("/questions/:id", getQuestionsForUser);

// Submit question answer
app.post("/answer", addQuestionAnswer);

/* For admin */
// Add a question (to check for duplicates)
app.post("/question", addQuestion);

// Add a question with options
app.post("/full-question", addFullQuestion);

// Delete a question with options
app.delete("/full-question/:id", deleteFullQuestion);

// Get Question info (Analysis)
app.get("/questions-info", getQuestionsAnalysis);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
