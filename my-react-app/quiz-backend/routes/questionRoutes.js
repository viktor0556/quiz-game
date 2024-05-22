const express = require('express');
const router = express.Router();
const db = require('../Models');

router.get('/questions', async (req, res) => {
  const { category, difficulty } = req.query;

  let whereClause = {};
  if (category) whereClause.category = category;
  if (difficulty) whereClause.difficulty = difficulty;

  try {
    const questions = await db.Question.findAll({ where: whereClause });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router