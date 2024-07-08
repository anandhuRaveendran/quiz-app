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
  { no: '4', question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
 

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
  const [timeLeft, setTimeLeft] = useState(10);
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
    setTimeLeft(10);
    setShowSummary(false);
    setAnswers([]);
    setShare(false)
  };

  const handleShare = () => {
    setShare(true)
  }

  if (showSummary) {
    return (

      <div className="flex min-h-screen sm:p-10 justify-center items-center bg-[#c8c7ff]">

      <div className="flex flex-col sm:flex-row sm:w-[60rem] sm:h-[40rem] sm:rounded-3xl h-full w-full sm:shadow-lg bg-white">
      <div className="flex sm:basis-1/2 flex-col items-center justify-center bg-gradient-to-b to-[#2e2be9] from-[#7857ff] sm:rounded-3xl rounded-b-3xl py-7 px-10">
          <h2 className="text-[#ebf1ff] font-hankengrotesk text-xl sm:text-lg font-bold">Your Result</h2>
          <div className="flex flex-col items-center justify-center w-44 h-44 rounded-full bg-gradient-to-b from-[#2421ca]/100 to-[#4e21ca]/0 my-6">
              <h1 className="text-white font-hankengrotesk text-7xl sm:text-6xl font-extrabold">{score*10}</h1>
              <p className="text-[#c8c7ff] text-lg sm:text-base font-hankengrotesk">of {answers.length*10}</p>
          </div>
          <h1 className="text-white font-hankengrotesk text-3xl sm:text-2xl mb-2 font-extrabold">Great</h1>
          <p className="text-center text-[#ebf1ff] text-lg sm:text-base font-hankengrotesk">You scored higher than 65% of the people who have taken these tests.</p>
      </div>
      <div className="flex sm:basis-1/2 flex-col min-h-auto justify-between space-y-5 p-8 sm:px-10">
          <h1 className="font-hankengrotesk text-xl sm:text-lg font-bold text-red-500">Summary</h1>
          <div className="flex flex-col space-y-4 overflow-auto">
            {<div>
           {answers.map((answer, index) => (
              <div key={index} className="mb-2">
                <p className='text-blue-500'>{answer.question}</p>
                {answer.selectedOption==answer.correctAnswer?<p className="text-green-500">Your answer: {answer.selectedOption}</p>:<p className="text-red-500">Your answer: {answer.selectedOption}</p>}
                <p>Correct answer: <span className='text-yellow-500'>{answer.correctAnswer}</span></p>
              </div>
            ))}</div>}
          
          </div>
          <button className="bg-[#303b5a] sm:hover:bg-gradient-to-b to-[#2e2be9] from-[#7857ff]
           active:bg-gradient-to-b text-white py-4 sm:py-3 rounded-full font-hankengrotesk text-xl 
           sm:text-lg font-bold" onClick={handleRestart}>Restart</button>
          <button className="bg-[#303b5a] sm:hover:bg-gradient-to-b to-[#2e2be9] from-[#7857ff] 
          active:bg-gradient-to-b text-white py-4 sm:py-3 rounded-full font-hankengrotesk
           text-xl sm:text-lg font-bold" onClick={handleShare}>Share</button>
 <div className='py-4 sm:py-3 '>
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
  </div>

    );
  }

  return (<div className='mx-96 my-32 border-2 shadow-2xl rounded-lg bg-white'>

  
    <div className="flex flex-col align-middle justify-items-center space-y-2 m-6">

      <div className=" flex flex-col w-full">
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
