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

const questions = [
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
  {
    question: "What is the chemical symbol for water?",
    category: "General Knowledge",
    difficulty: "Easy",
    answers: [
      { text: "HO", isCorrect: false },
      { text: "CO2", isCorrect: false },
      { text: "H2O", isCorrect: true },
      { text: "O2", isCorrect: false },
    ],
  },
  {
    question: 'Which planet is known as the "Red Planet"?',
    category: "General Knowledge",
    difficulty: "Medium",
    answers: [
      { text: "Venus", isCorrect: false },
      { text: "Jupiter", isCorrect: false },
      { text: "Mars", isCorrect: true },
      { text: "Saturn", isCorrect: false },
    ],
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
    category: "General Knowledge",
    difficulty: "Hard",
    answers: [
      { text: "Marie Curie", isCorrect: true },
      { text: "Rosalind Franklin", isCorrect: false },
      { text: "Ada Lovelace", isCorrect: false },
      { text: "Dorothy Crowfoot Hodgkin", isCorrect: false },
    ],
  },
  {
    question: "What is the value of π (pi) rounded to two decimal places?",
    category: "Math",
    difficulty: "Easy",
    answers: [
      { text: "3.12", isCorrect: false},
      { text: "3.14", isCorrect: true },
      { text: "3.16", isCorrect: false },
      { text: "3.18", isCorrect: false },
    ],
  },
  {
    question: "What is the perimeter of a rectangle with length 6 units and width 8 units?",
    category: "Math",
    difficulty: "Medium",
    answers: [
      { text: "24 units", isCorrect: false },
      { text: "30 units", isCorrect: false },
      { text: "40 units", isCorrect: true },
      { text: "48 units", isCorrect: false },
    ],
  },
  {
    question: "If f(x) = 2x² - 3x + 1, what is f'(x), the derivative of f(x)?",
    category: "Math",
    difficulty: "Hard",
    answers: [
      { text: "4x - 3", isCorrect: false },
      { text: "4x² - 3", isCorrect: true },
      { text: "4x - 2", isCorrect: false },
      { text: "2x² - 3x", isCorrect: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    category: "Geography",
    difficulty: "Easy",
    answers: [
      { text: "Atlantic Ocean", isCorrect: false },
      { text: "Pacific Ocean", isCorrect: true },
      { text: "Indian Ocean", isCorrect: false },
      { text: "Arctic Ocean", isCorrect: false },
    ],
  },
  {
    question: 'Which mountain range is often referred to as the "Roof of the World"?',
    category: "Geography",
    difficulty: "Medium",
    answers: [
      { text: "Andes", isCorrect: false },
      { text: "Rocky Mountains", isCorrect: false },
      { text: "Alps", isCorrect: false },
      { text: "Himalayas", isCorrect: true },
    ],
  },
  {
    question: "What is the capital city of Kazakhstan?",
    category: "Geography",
    difficulty: "Hard",
    answers: [
      { text: "Tashkent", isCorrect: false },
      { text: "Bishkek", isCorrect: false },
      { text: "Astana", isCorrect: true },
      { text: "Dushanbe", isCorrect: false },
    ],
  },
  {
    question: "What is the closest star to Earth?",
    category: "Science",
    difficulty: "Easy",
    answers: [
      { text: "Alpha Centauri", isCorrect: false },
      { text: "Proxima Centauri", isCorrect: true },
      { text: "Sirius", isCorrect: false },
      { text: "Betelgeuse", isCorrect: false },
    ],
  },
  {
    question: "Who is credited with discovering penicillin?",
    category: "Science",
    difficulty: "Medium",
    answers: [
      { text: "Alexander Fleming", isCorrect: true },
      { text: "Louis Pasteur", isCorrect: false },
      { text: "Marie Curie", isCorrect: false },
      { text: "Isaac Newton", isCorrect: false },
    ],
  },
  {
    question: 'What is the phenomenon in quantum mechanics where particles are connected regardless of distance, famously called "spooky action at a distance"?',
    category: "Science",
    difficulty: "Hard",
    answers: [
      { text: "Quantum Convergence", isCorrect: false },
      { text: "Quantum Tunneling", isCorrect: false },
      { text: "Quantum Entanglement", isCorrect: true },
      { text: "Quantum Oscillation", isCorrect: false },
    ],
  },
  {
    question: "What year did World War II end?",
    category: "History",
    difficulty: "Easy",
    answers: [
      { text: "1943", isCorrect: false },
      { text: "1945", isCorrect: true },
      { text: "1950", isCorrect: false },
      { text: "1939", isCorrect: false },
    ],
  },
  {
    question: "Who was the first president of the United States?",
    category: "History",
    difficulty: "Medium",
    answers: [
      { text: "Thomas Jefferson", isCorrect: false },
      { text: "Abraham Lincoln", isCorrect: false },
      { text: "George Washington", isCorrect: true },
      { text: "John Adams", isCorrect: false },
    ],
  },
  {
    question: "What was the significance of the Treaty of Tordesillas?",
    category: "History",
    difficulty: "Hard",
    answers: [
      { text: "It ended the Hundred Years' War", isCorrect: false },
      { text: "It established the Spanish Armada", isCorrect: false },
      { text: "It divided the New World between Spain and Portugal", isCorrect: true },
      { text: "It ended the Napoleonic Wars", isCorrect: false },
    ],
  },
  {
    question: 'What is the real name of Mark Twain, the author of "The Adventures of Tom Sawyer"?',
    category: "Literature",
    difficulty: "Easy",
    answers: [
      { text: "Samuel Clemens", isCorrect: true },
      { text: "William Faulkner", isCorrect: false },
      { text: "Ernest Hemingway", isCorrect: false },
      { text: "F. Scott Fitzgerald", isCorrect: false },
    ],
  },
  {
    question: "Which novel features a character named Atticus Finch, a lawyer who defends a black man accused of raping a white woman in the American South?",
    category: "Literature",
    difficulty: "Medium",
    answers: [
      { text: '"The Great Gatsby"', isCorrect: false },
      { text: '"Pride and Prejudice"', isCorrect: false },
      { text: '"To Kill a Mockingbird"', isCorrect: true },
      { text: '"1984"', isCorrect: false },
    ],
  },
  {
    question: 'Who wrote the play "The Cherry Orchard," a masterpiece of Russian literature symbolizing the decline of the aristocracy and the rise of the middle class?',
    category: "Literature",
    difficulty: "Hard",
    answers: [
      { text: "Anton Chekhov", isCorrect: true },
      { text: "Fyodor Dostoevsky", isCorrect: false },
      { text: "Leo Tolstoy", isCorrect: false },
      { text: "Ivan Turgenev", isCorrect: false },
    ],
  },
  {
    question: "Which of the following is an example of a simple machine?",
    category: "Physics",
    difficulty: "Easy",
    answers: [
      { text: "Electromagnet", isCorrect: false },
      { text: "Lever", isCorrect: true },
      { text: "Solar panel", isCorrect: false },
      { text: "Radioactive decay", isCorrect: false },
    ],
  },
  {
    question: "What is the SI unit of measurement for electric current?",
    category: "Physics",
    difficulty: "Medium",
    answers: [
      { text: "Newton", isCorrect: false },
      { text: "Volt", isCorrect: false },
      { text: "Ampere", isCorrect: true },
      { text: "Ohm", isCorrect: false },
    ],
  },
  {
    question: "According to Einstein's theory of relativity, what happens to the mass of an object as its speed approaches the speed of light?",
    category: "Physics",
    difficulty: "Hard",
    answers: [
      { text: "It decreases", isCorrect: false },
      { text: "It remains constant", isCorrect: false },
      { text: "It increases", isCorrect: true },
      { text: "It becomes zero", isCorrect: false },
    ],
  },
]

async function initializeServer() {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Database synced");

    const existingQuestions = await Question.findAll();
    if (existingQuestions.length === 0) {
      await Question.bulkCreate(questions);
    }

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
  }
}

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

initializeServer();