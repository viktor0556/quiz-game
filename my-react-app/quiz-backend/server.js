const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const Question = require("./Models/Question");
const db = require("./Models");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/questions", async (req, res) => {
  const { category, difficulty } = req.query;
  const where = {};
  if (category) where.category = category;
  if (difficulty) where.difficulty = difficulty;

  try {
    const questions = await Question.findAll({ where });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

db.sequelize.sync({ force: true }).then(async () => {
  console.log("Database synced");

  const questions = await Question.findAll();
  if (questions.length === 0) {
    await Question.bulkCreate([
      {
        question: "What is the capital of France?",
        category: "Geography",
        difficulty: "Easy",
        answers: [
          { text: "Berlin", isCorrect: false },
          { text: "Madrid", isCorrect: false },
          { text: "Paris", isCorrect: true },
          { text: "Rome", isCorrect: false },
        ],
      },
      {
        question: "What is 2 + 2?",
        category: "Math",
        difficulty: "Easy",
        answers: [
          { text: "3", isCorrect: false },
          { text: "4", isCorrect: true },
          { text: "5", isCorrect: false },
          { text: "6", isCorrect: false },
        ],
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        category: "Literature",
        difficulty: "Medium",
        answers: [
          { text: "Harper Lee", isCorrect: true },
          { text: "J.K. Rowling", isCorrect: false },
          { text: "Ernest Hemingway", isCorrect: false },
          { text: "Mark Twain", isCorrect: false },
        ],
      },
    ]);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
