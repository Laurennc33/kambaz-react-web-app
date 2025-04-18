import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useQuiz } from "./quizcontext";
import { saveAttempt } from "./quizAttemptsSlice";

export default function StudentQuizView() {
  const { quizId, studentId } = useParams();
  const { attempts, saveAttempt } = useQuiz();

  const [quizData, setQuizData] = useState<any>(null);
  const [currentAnswers, setCurrentAnswers] = useState<{ [key: string]: string }>({});
  const [attempted, setAttempted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!quizId) return;

    // Fetch quiz data
    fetch(`/api/quizzes/${quizId}`)
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error("Failed to fetch quiz:", err));
  }, [quizId]);

  useEffect(() => {
    if (!quizId || !studentId) return;

    const previousAttempt = attempts.find(
      (attempt: any) => attempt.quizId === quizId && attempt.studentId === studentId
    );

    if (previousAttempt) {
      setCurrentAnswers(previousAttempt.answers);
      setAttempted(true);
      setScore(previousAttempt.score); // Display score if already attempted
    }
  }, [attempts, quizId, studentId]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!quizData || attempted) return;

    let calculatedScore = 0;
    quizData.questions.forEach((question: any) => {
      if (currentAnswers[question.id] === question.correctAnswer) {
        calculatedScore++;
      }
    });

//     const newAttempt = {
//       quizId,
//       studentId,
//       answers: currentAnswers,
//       score: calculatedScore,
//       attemptDate: new Date().toISOString(),
//     };

//     saveAttempt(newAttempt);
//     setScore(calculatedScore);
//     setAttempted(true);
//   };

  return (
    <div className="student-quiz-view">
      {/* <h2>{quizData ? quizData.title : "Loading Quiz..."}</h2>
      <Form>
        <ListGroup>
          {quizData?.questions?.map((question: any) => (
            <ListGroup.Item key={question.id}>
              <Form.Label>{question.text}</Form.Label>
              {question.type === "multiple_choice" && (
                <div>
                  {question.options.map((option: string, idx: number) => (
                    <Form.Check
                      key={idx}
                      type="radio"
                      label={option}
                      name={question.id}
                      value={option}
                      checked={currentAnswers[question.id] === option}
                      disabled={attempted}
                      onChange={() => handleAnswerChange(question.id, option)}
                    />
                  ))}
                </div>
              )}
              {question.type === "true_false" && (
                <div>
                  {["true", "false"].map((option) => (
                    <Form.Check
                      key={option}
                      type="radio"
                      label={option.charAt(0).toUpperCase() + option.slice(1)}
                      name={question.id}
                      value={option}
                      checked={currentAnswers[question.id] === option}
                      disabled={attempted}
                      onChange={() => handleAnswerChange(question.id, option)}
                    />
                  ))}
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {attempted ? (
          <div className="mt-3">
            <h4>Your Score: {score} / {quizData?.questions.length}</h4>
            <div>
              {quizData?.questions.map((question: any) => (
                <div key={question.id}>
                  <strong>{question.text}</strong>{" "}
                  {currentAnswers[question.id] === question.correctAnswer ? (
                    <span style={{ color: "green" }}>✔️</span>
                  ) : (
                    <span style={{ color: "red" }}>❌</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Button className="mt-3" onClick={handleSubmitQuiz}>
            Submit Quiz
          </Button>
        )}
      </Form> */}
      HELLO THERE
    </div>
  );
}}
