'use client';

import { useState, useEffect } from 'react';
import { 
  FacebookShareButton, 
  FacebookIcon, 
  RedditShareButton, 
  RedditIcon, 
  WhatsappShareButton, 
  WhatsappIcon, 
  LinkedinShareButton, 
  LinkedinIcon, 
} from 'next-share'; 

interface Question {
  no: String;
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  { no: '1', question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { no: '2', question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { no: '3', question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { no: '4', question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" }
];

interface Answer {
  question: string;
  selectedOption: string | null;
  correctAnswer: string;
}

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showSummary, setShowSummary] = useState(false);
  const [share, setShare] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [summary, setSummary] = useState(false);

  useEffect(() => {
    if (showSummary) return; 
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion(true);
    }
  }, [timeLeft, showSummary]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = (timeUp: boolean = false) => {
    if (selectedOption !== null || timeUp) {
      const isCorrect = selectedOption === questions[currentQuestionIndex].answer;
      if (!timeUp) {
        setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
      }

      setAnswers([
        ...answers,
        {
          question: questions[currentQuestionIndex].question,
          selectedOption,
          correctAnswer: questions[currentQuestionIndex].answer,
        },
      ]);

      setSelectedOption(null);
      setTimeLeft(10);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowSummary(true);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setTimeLeft(10);

      const prevAnswer = answers[prevIndex];
      setSelectedOption(prevAnswer?.selectedOption || null);

      const updatedAnswers = answers.slice(0, prevIndex);
      setAnswers(updatedAnswers);

      if (prevAnswer?.selectedOption === prevAnswer?.correctAnswer) {
        setScore(score - 1);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setTimeLeft(60);
    setShowSummary(false);
    setAnswers([]);
    setShare(false)
  };

  const handleShare = () => {
    setShare(true)
  }

  if (showSummary) {
    return (
      <div className="flex flex-col align-middle m-32">
        <div className='flex flex-col space-y-4 ml-auto mr-auto border'>
          {summary == true ? <div className='flex flex-col align-middle  p-2 '><h2 className="text-2xl font-bold">Quiz Summary</h2>
            {answers.map((answer, index) => (
              <div key={index} className="mb-2">
                <p>{answer.question}</p>
                <p>Your answer: {answer.selectedOption}</p>
                <p>Correct answer: {answer.correctAnswer}</p>
              </div>
            ))}</div> : <div></div>}
        </div>
        <p>Your final score: {score}</p><div className='flex flex-col align-middle'>

        <button className="mt-1 ml-auto mr-auto p-2 bg-blue-500 text-white border rounded-lg cursor-pointer  align-middle h-10" onClick={() => setSummary(true)}>Quiz Summary</button>
        <div className='flex flex-col space-y-4 ml-auto mr-auto w-40'>
          <button className="mt-1 ml-auto mr-auto p-2 bg-blue-500 text-white border rounded-lg cursor-pointer  align-middle h-10" onClick={handleRestart}>Restart Quiz</button>
          <button className="mt-1 ml-auto mr-auto p-2 bg-blue-500 text-white border rounded-lg cursor-pointer  align-middle h-10" onClick={handleShare} >Share</button>
        </div>
        <div className='share-design'>
          {share == true ? <div>
            <FacebookShareButton url={'http://localhost:3000'}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <RedditShareButton url={'http://localhost:3000'}>
              <RedditIcon size={32} round />
            </RedditShareButton>
            <WhatsappShareButton url={'http://localhost:3000'}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={'http://localhost:3000'}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div> : ''}
        </div>
        </div>

      </div>
    );
  }

  return (<div className='m-32 border shadow-2xl rounded-lg'>

  
    <div className="flex flex-col align-middle justify-items-center space-y-2 m-6">

      <div className=" flex flex-col align-middle justify-center w-full">
      <h2 className="text-3xl font-bold text-red-600">{questions[currentQuestionIndex].no}:{questions[currentQuestionIndex].question}</h2>

      </div>
      <div className="space-y-4 flex flex-col">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div >
        <div className="timer">{timeLeft} seconds left</div>
      </div>
      <div className="navigation">
        <button className="prev-button" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button className="next-button" onClick={() => handleNextQuestion()} disabled={selectedOption === null}>
          {currentQuestionIndex == questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
      <div className="score">Current score: {score}</div>
    </div></div>
  );
};

export default Quiz;
