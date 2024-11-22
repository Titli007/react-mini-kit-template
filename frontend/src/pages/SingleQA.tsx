import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../api/GetQuestionById';
import { updateQuestion } from '../api/UpdateQuestion';

interface Question {
  _id: string; // Use _id to match the backend
  question: string;
  answers: string[] | null; // Handle cases where answers might be null
  createdAt: string;
}

const SingleQA = () => {
  const { id } = useParams<{ id: string }>(); // get the id from the URL
  const [question, setQuestion] = useState<Question | null>(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      console.log(id)
      getQuestionById(id)
        .then((data) => setQuestion(data))
        .catch((error) => console.error("Error fetching question:", error));
    }
  }, [id]);
  console.log(question)


  const handleSubmit = async () => {
    if (!id || !newAnswer.trim()) return;

    setIsSubmitting(true);
    try {
      console.log(id, newAnswer)
      const res = await updateQuestion(id, newAnswer);
      console.log("res in singleqa",res)
      setQuestion((prevQuestion) => {
        if (prevQuestion) {
          return {
            ...prevQuestion,
            answers: prevQuestion.answers ? [...prevQuestion.answers, newAnswer] : [newAnswer],
          };
        }
        return prevQuestion;
      });
      setNewAnswer("");
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold">{question.question}</h2>
        {question.answers && question.answers.length > 0 ? (
          <ul className="list-disc list-inside mt-2">
            {question.answers.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        ) : (
          <p>No answers yet.</p>
        )}

        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Write your answer here..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          ></textarea>
          <button
            className={`mt-2 px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleQA;