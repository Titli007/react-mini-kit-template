// questionRoutes.js
import express from "express";
const router = express.Router();
import Question from "../models/Question"; // Import the Question model

// Route to create a new question
router.post('/create', async (req, res) => {
  try {
    console.log(req.body)
    const { question } = req.body;
    const newQuestion = new Question({ question });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ error: 'Error creating question' });
  }
});

// Route to read all questions
router.get('/', async (req, res) => {
  try {
    console.log("its coming in get")
    const questions = await Question.find();
    console.log(questions)
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

// Route to read a specific question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching question' });
  }
});

// Route to update a question with an answer
router.put('/update/:id', async (req, res) => {
  try {
    const { answer } = req.body;

    // Use `$push` to add the new answer to the `answers` array
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { 
        $push: { answers: answer }, 
        answeredAt: new Date(),
      },
      { new: true }
    );

    if (updatedQuestion) {
      res.json(updatedQuestion);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error updating question' });
  }
});

// Route to delete a question by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (deletedQuestion) {
      res.json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting question' });
  }
});

export default router
