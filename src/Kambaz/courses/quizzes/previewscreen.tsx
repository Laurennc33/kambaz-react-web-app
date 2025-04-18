import React from 'react';
import { useLocation } from 'react-router-dom';

type Question = {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_in_blank';
  question: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
  fillInTheBlankAnswers?: string[];
};

const QuizPreview: React.FC = () => {
  const location = useLocation();
  const questions: Question[] = location.state?.questions || [];

  return (
    <div>
      <h3>Quiz Preview</h3>
      {questions.length === 0 ? (
        <p>No questions available to preview.</p>
      ) : (
        questions.map((question: Question) => (
          <div key={question.id} style={{ marginBottom: '1.5rem' }}>
            <h5>{question.question}</h5>

            {/* Render Multiple Choice */}
            {question.type === 'multiple_choice' && (
              <ul>
                {question.options?.map((option: string, index: number) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}

            {/* Render True/False */}
            {question.type === 'true_false' && (
              <p><strong>Correct Answer:</strong> {question.correctAnswer === 'true' ? 'True' : 'False'}</p>
            )}

            {/* Render Fill in the Blank */}
            {question.type === 'fill_in_blank' && (
              <ul>
                {question.fillInTheBlankAnswers?.map((answer: string, index: number) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            )}

            <p><strong>Points:</strong> {question.points}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default QuizPreview;
