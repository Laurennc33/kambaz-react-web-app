// src/contexts/QuizContext.tsx
import React, { createContext, useContext, useState } from 'react';

// quizcontext.ts
export type Question = {
    id: string;
    type: 'multiple_choice' | 'true_false' | 'fill_in_blank';
    question: string;
    points: number;
    options: string[];
    correctAnswer: string;
    fillInTheBlankAnswers: { text: string; isCorrect: boolean }[];
};
  

export type Attempt = {
  quizId: string;
  studentId: string;
  answers: Record<string, string>;
  score: number;
  attemptDate: string;
};

type QuizContextType = {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  attempts: Attempt[];
  saveAttempt: (attempt: Attempt) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  return (
    <QuizContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// attempts 
