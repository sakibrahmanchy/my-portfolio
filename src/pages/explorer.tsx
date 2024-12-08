// path/to/pages/explorer.js
import { useState } from 'react';

export default function Explorer() {
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState('');

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (quizAnswer.toLowerCase() === 'your answer') {
      setQuizResult('Correct! You can now proceed to the next level.');
    } else {
      setQuizResult('Try again!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Level 1: The Explorer</h1>
      <p className="mb-8">Learn about me and take the quiz to unlock the next level!</p>
      <form onSubmit={handleQuizSubmit} className="mb-4">
        <label className="block mb-2">What is your favorite programming language?</label>
        <input
          type="text"
          value={quizAnswer}
          onChange={(e) => setQuizAnswer(e.target.value)}
          className="border p-2 mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
      {quizResult && <p className="mt-4">{quizResult}</p>}
    </div>
  );
}