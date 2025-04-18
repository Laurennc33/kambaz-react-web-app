import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz, Question } from './quizcontext';
import { updateQuizQuestions } from './client'; // <-- Adjust path if needed

export default function QuizQuestionsEditor() {
  const { questions, setQuestions } = useQuiz();
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: '',
    type: 'multiple_choice',
    question: '',
    points: 1,
    options: ['', '', '', ''],
    correctAnswer: '',
    fillInTheBlankAnswers: [{ text: '', isCorrect: true }],
  });

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const navigate = useNavigate();
  const { cid, qid } = useParams();

  useEffect(() => {
    calculateTotalPoints();
  }, [questions]);

  useEffect(() => {
    if (!qid) {
      console.error("Quiz ID (qid) is missing!");
      navigate('/path-to-some-other-page'); // Redirect if no qid
    }
  }, [qid, navigate]);

  const calculateTotalPoints = () => {
    const total = questions.reduce((acc, curr) => acc + curr.points, 0);
    setPoints(total);
  };

  const syncQuestionsWithServer = async (updatedQuestions: Question[]) => {
    if (!qid) return;
    try {
      await updateQuizQuestions(qid, updatedQuestions);
    } catch (err) {
      console.error("Failed to sync questions with server:", err);
    }
  };

  const handleAddQuestion = async () => {
    if (qid) {
      const newQ: Question = { ...newQuestion, id: `${Date.now()}` }; // Ensure `id` is assigned
      const updated: Question[] = [...questions, newQ];
      setQuestions(updated); // Update local state with new question
      resetNewQuestion(); // Reset form for new question

      try {
        await syncQuestionsWithServer(updated); // Sync with server after local state update
      } catch (err) {
        console.error("Failed to sync questions to server:", err);
      }
    } else {
      console.error("Quiz ID (qid) is undefined. Cannot save question.");
    }
  };

  const handleEditQuestion = (questionId: string) => {
    const questionToEdit = questions.find((q) => q.id === questionId);
    if (questionToEdit) {
      setEditingQuestionId(questionId);
      setNewQuestion({ ...questionToEdit });
    }
  };

  const handleSaveEdit = async () => {
    if (editingQuestionId) {
      const updated = questions.map((q) =>
        q.id === editingQuestionId ? { ...newQuestion } : q
      );
      setQuestions(updated);
      await syncQuestionsWithServer(updated);
      resetNewQuestion();
    }
  };

  const handleCancelEdit = () => {
    resetNewQuestion();
  };

  const handleDeleteQuestion = async (id: string) => {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
    await syncQuestionsWithServer(updated);
  };

  const resetNewQuestion = () => {
    setEditingQuestionId(null);
    setNewQuestion({
      id: '',
      type: 'multiple_choice',
      question: '',
      points: 1,
      options: ['', '', '', ''],
      correctAnswer: '',
      fillInTheBlankAnswers: [{ text: '', isCorrect: true }],
    });
  };

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) : value,
    }));
  };

  const handleChangeOptions = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updated = [...newQuestion.options];
    updated[index] = e.target.value;
    setNewQuestion((prev) => ({
      ...prev,
      options: updated,
    }));
  };

  const handleChangeFillInTheBlankAnswerText = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updated = [...newQuestion.fillInTheBlankAnswers];
    updated[index].text = e.target.value;
    setNewQuestion((prev) => ({
      ...prev,
      fillInTheBlankAnswers: updated,
    }));
  };

  const toggleFillInTheBlankCorrect = (index: number) => {
    const updated = [...newQuestion.fillInTheBlankAnswers];
    updated[index].isCorrect = !updated[index].isCorrect;
    setNewQuestion((prev) => ({
      ...prev,
      fillInTheBlankAnswers: updated,
    }));
  };

  const addFillInTheBlankAnswer = () => {
    setNewQuestion((prev) => ({
      ...prev,
      fillInTheBlankAnswers: [...prev.fillInTheBlankAnswers, { text: '', isCorrect: false }],
    }));
  };

  const removeFillInTheBlankAnswer = (index: number) => {
    const updated = [...newQuestion.fillInTheBlankAnswers];
    updated.splice(index, 1);
    setNewQuestion((prev) => ({
      ...prev,
      fillInTheBlankAnswers: updated,
    }));
  };

  const handleCorrectAnswerChange = (val: string) => {
    setNewQuestion((prev) => ({
      ...prev,
      correctAnswer: val,
    }));
  };

  const handleBackToQuiz = () => {
    navigate(`/Kambaz/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAllQuestions = async () => {
    if (qid) {
      try {
        await syncQuestionsWithServer(questions); // Save all the questions
        console.log('All questions saved!');
      } catch (err) {
        console.error('Error saving all questions:', err);
      }
    } else {
      console.error("Quiz ID (qid) is missing. Cannot save questions.");
    }
  };

  return (
    <div className="quiz-questions-editor">
      <h2>Quiz Questions Editor</h2>

      <div className="d-flex justify-content-between">
        <h5>Total Points: {points}</h5>
        <Button onClick={handleAddQuestion} variant="success">Add New Question</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Question</th>
            <th>Type</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.question}</td>
              <td>{q.type}</td>
              <td>{q.points}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditQuestion(q.id)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteQuestion(q.id)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between mt-3">
        <Button variant="primary" onClick={handleBackToQuiz}>Back to Quiz Details</Button>
        <Button variant="primary" onClick={handleSaveAllQuestions}>Save All Questions</Button>
      </div>

      {(editingQuestionId || newQuestion.question) && (
        <div>
          <h3>{editingQuestionId ? 'Edit Question' : 'New Question'}</h3>

          <Form>
            <Form.Group controlId="formQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                name="question"
                value={newQuestion.question}
                onChange={handleChangeQuestion}
              />
            </Form.Group>

            <Form.Group controlId="formQuestionType">
              <Form.Label>Question Type</Form.Label>
              <DropdownButton title={newQuestion.type} onSelect={(type) => setNewQuestion((prev) => ({ ...prev, type }))}>
                <Dropdown.Item eventKey="multiple_choice">Multiple Choice</Dropdown.Item>
                <Dropdown.Item eventKey="true_false">True/False</Dropdown.Item>
                <Dropdown.Item eventKey="fill_in_blank">Fill in the Blank</Dropdown.Item>
              </DropdownButton>
            </Form.Group>

            <Form.Group controlId="formPoints">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                name="points"
                value={newQuestion.points}
                onChange={handleChangeQuestion}
              />
            </Form.Group>

            {newQuestion.type === 'multiple_choice' && (
              <>
                <Form.Label>Options (Select correct answer)</Form.Label>
                {newQuestion.options.map((option, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-2">
                    <Form.Check
                      type="radio"
                      name="correctOption"
                      checked={newQuestion.correctAnswer === option}
                      onChange={() => handleCorrectAnswerChange(option)}
                      className="me-2"
                    />
                    <Form.Control
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={option}
                      onChange={(e) => handleChangeOptions(e, idx)}
                    />
                  </div>
                ))}
              </>
            )}

            {newQuestion.type === 'true_false' && (
              <>
                <Form.Label>Correct Answer</Form.Label>
                <Form.Check
                  type="radio"
                  label="True"
                  value="true"
                  checked={newQuestion.correctAnswer === 'true'}
                  onChange={() => handleCorrectAnswerChange('true')}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  value="false"
                  checked={newQuestion.correctAnswer === 'false'}
                  onChange={() => handleCorrectAnswerChange('false')}
                />
              </>
            )}

            {newQuestion.type === 'fill_in_blank' && (
              <>
                <Form.Label>Answers (Fill in the blank)</Form.Label>
                {newQuestion.fillInTheBlankAnswers.map((answer, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      placeholder={`Answer ${idx + 1}`}
                      value={answer.text}
                      onChange={(e) => handleChangeFillInTheBlankAnswerText(e, idx)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Correct"
                      checked={answer.isCorrect}
                      onChange={() => toggleFillInTheBlankCorrect(idx)}
                      className="ms-2"
                    />
                    <Button variant="danger" onClick={() => removeFillInTheBlankAnswer(idx)}><FaTrashAlt /></Button>
                  </div>
                ))}
                <Button onClick={addFillInTheBlankAnswer}>Add Answer</Button>
              </>
            )}

            <div className="d-flex justify-content-end mt-4">
              {editingQuestionId ? (
                <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
              ) : (
                <Button variant="success" onClick={handleAddQuestion}>Add Question</Button>
              )}
              {editingQuestionId && (
                <Button variant="warning" onClick={handleCancelEdit}>Cancel Edit</Button>
              )}
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
