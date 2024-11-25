import React, { useState, useEffect } from 'react';
import { createQuestion } from '../api/CreateQuestion';
import { deleteQuestion } from '../api/DeleteQuestion';
import { getQuestionById } from '../api/GetQuestionById';
import { getQuestions } from '../api/GetQuestion';
import { updateQuestion } from '../api/UpdateQuestion';
import { useNavigate } from 'react-router-dom';

interface Question {
  _id: string; // Use _id to match the backend
  question: string;
  answers: string[] | null; // Handle cases where answers might be null
  createdAt: string;
}

export default function QAPage() {
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch questions on component mount
    getQuestions()
      .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newQuestion)
    if (newQuestion.trim()) {
      try {
        const savedQuestion = await createQuestion( newQuestion );
        console.log(savedQuestion)
        setQuestions([...questions, savedQuestion]);
        setNewQuestion('');
      } catch (error) {
        console.error("Error creating question:", error);
      }
    }
  };

  const handleAddAnswer = async (questionId: string) => {
    console.log(newAnswer, questionId)
    navigate(`/question/${questionId}`)
  };
  
  

  // const handleDeleteQuestion = async (questionId: string) => {
  //   try {
  //     await deleteQuestion(questionId);
  //     setQuestions(questions.filter(q => q._id !== questionId));
  //   } catch (error) {
  //     console.error("Error deleting question:", error);
  //   }
  // };

  const handleShareQuestionById = async (questionId: string) => {
    const appId = import.meta.env.VITE_APP_ID; // Retrieve app ID from environment
    const path = `question/${questionId}`; // Define the path for the specific question
    const shareUrl = `https://worldcoin.org/mini-app?app_id=${appId}&path=${path}`;
  
    try {
      // Copy the share URL to the clipboard
      await navigator.clipboard.writeText(shareUrl);
      
      // Show an alert that the link has been copied
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Error sharing question:", error);
      alert("Failed to copy the link.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Add Your Question</h1>
        
        <form onSubmit={handleAddQuestion} className="mb-6">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter your question"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Submit Question
          </button>
        </form>

        <div className="space-y-4">
  {questions.map((question) => (
    <div key={question._id} className="border border-gray-200 rounded-md p-4">
      <h2 className="text-lg font-semibold mb-2">{question.question}</h2>
      
      {question.answers && question.answers.length > 0 ? (
        <ul className="list-disc list-inside mb-2">
          {question.answers.map((answer, index) => (
            <li key={index} className="text-gray-700">{answer}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No answers yet.</p>
      )}

      {answeringQuestionId === question._id ? (
        <div>
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="mt-2 space-x-2">
            <button
              // onClick={() => handleAddAnswer(question._id)}
              className="px-3 py-1 bg-green-500 text-white rounded-md"
            >
              Submit Answer
            </button>
            <button
              onClick={() => setAnsweringQuestionId(null)}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-x-2">
          <button
            onClick={() => handleAddAnswer(question._id)}
            className="px-3 py-1 bg-purple-600 text-white rounded-md"
          >
            Answer
          </button>
          <button
            onClick={() => handleShareQuestionById(question._id)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md"
          >
            share
          </button>
        </div>
      )}
    </div>
  ))}
</div>
      </div>
    </div>
  );
}
