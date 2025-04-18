// src/contexts/QuizContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Question = {
  id: string;
  type: string;
  question: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
  fillInTheBlankAnswers?: string[];
};

type QuizContextType = {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
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
