import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from './quizcontext'; // ✅ Import your context

export default function QuizQuestionsEditor() {
  const { questions, setQuestions } = useQuiz(); // ✅ Use context
  const [newQuestion, setNewQuestion] = useState({
    id: '',
    type: 'multiple_choice',
    question: '',
    points: 1,
    options: ['', '', '', ''],
    correctAnswer: '',
    fillInTheBlankAnswers: [''],
  });
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);

  const navigate = useNavigate();
  const { cid, qid } = useParams(); // Get IDs from route

  useEffect(() => {
    calculateTotalPoints();
  }, [questions]);

  const calculateTotalPoints = () => {
    const total = questions.reduce((acc, curr) => acc + curr.points, 0);
    setPoints(total);
  };

  const handleAddQuestion = () => {
    const newQ = { ...newQuestion, id: `${Date.now()}` };
    setQuestions((prev) => [...prev, newQ]);
    resetNewQuestion();
  };

  const handleEditQuestion = (id: string) => {
    const q = questions.find((q) => q.id === id);
    if (q) {
      setEditingQuestionId(id);
      setNewQuestion({ ...q });
    }
  };

  const handleSaveEdit = () => {
    if (editingQuestionId) {
      setQuestions((prev) =>
        prev.map((q) => (q.id === editingQuestionId ? { ...newQuestion } : q))
      );
      resetNewQuestion();
    }
  };

  const handleCancelEdit = () => {
    resetNewQuestion();
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
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
      fillInTheBlankAnswers: [''],
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

  const handleChangeFillInTheBlankAnswer = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updated = [...newQuestion.fillInTheBlankAnswers];
    updated[index] = e.target.value.trim().toLowerCase();
    setNewQuestion((prev) => ({
      ...prev,
      fillInTheBlankAnswers: updated,
    }));
  };

  const addFillInTheBlankAnswer = () => {
    setNewQuestion((prev) => ({
      ...prev,
      fillInTheBlankAnswers: [...prev.fillInTheBlankAnswers, ''],
    }));
  };

  const removeFillInTheBlankAnswer = (index: number) => {
    setNewQuestion((prev) => ({
      ...prev,
      fillInTheBlankAnswers: prev.fillInTheBlankAnswers.filter((_, i) => i !== index),
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
                <Form.Label>Options</Form.Label>
                {newQuestion.options.map((option, idx) => (
                  <Form.Control
                    key={idx}
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={option}
                    onChange={(e) => handleChangeOptions(e, idx)}
                    className="mb-2"
                  />
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
                <Form.Label>Correct Answers (Case Insensitive)</Form.Label>
                {newQuestion.fillInTheBlankAnswers.map((answer, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      value={answer}
                      onChange={(e) => handleChangeFillInTheBlankAnswer(e, index)}
                    />
                    <Button variant="danger" size="sm" className="ms-2" onClick={() => removeFillInTheBlankAnswer(index)}>
                      <FaTrashAlt />
                    </Button>
                  </div>
                ))}
                <Button variant="primary" size="sm" onClick={addFillInTheBlankAnswer}>
                  Add Answer
                </Button>
              </>
            )}

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
            </div>
          </Form>
        </div>
      )}

      <div className="mt-4">
        <Button variant="secondary" onClick={handleBackToQuiz}>
          Back to Quiz
        </Button>
      </div>
    </div>
  );
}
