import {
    Button,
    Form,
    FormControl,
    FormSelect,
  } from "react-bootstrap";
  import { useNavigate, useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { v4 as uuidv4 } from "uuid";
  import { IoEllipsisVertical } from "react-icons/io5";
  import { GoCircleSlash } from "react-icons/go";
  import { BiPlus } from "react-icons/bi";
  // import { updateQuiz, addQuiz } from "./quizReducer"; // Uncomment and update with your real reducer
  
  export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [quizPoints, setQuizPoints] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [availableUntil, setAvailableUntil] = useState("");
  
    const { quizzes } = useSelector((state: any) => state.quizReducer);
  
    useEffect(() => {
      if (qid) {
        const quiz = quizzes.find((q: any) => q._id === qid);
        if (quiz) {
          setQuizTitle(quiz.title);
          setQuizDescription(quiz.description);
          setQuizPoints(quiz.points);
          setDueDate(quiz.dueDate);
          setAvailableFrom(quiz.availableFrom);
          setAvailableUntil(quiz.availableUntil);
        }
      }
    }, [qid, quizzes]);
  
    const handleSaveQuiz = () => {
      const newQuiz = {
        _id: qid || uuidv4(),
        title: quizTitle,
        course: cid,
        description: quizDescription,
        points: quizPoints,
        dueDate,
        availableFrom,
        availableUntil,
      };
  
      // Dispatch your save action here
      // qid ? dispatch(updateQuiz(newQuiz)) : dispatch(addQuiz(newQuiz));
  
      // Navigate to the quiz detail page (with questions)
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}`);
    };
  
    return (
      <div className="p-4">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h4>{qid ? "Edit Quiz" : "New Quiz"}</h4>
          <div className="d-flex align-items-center">
            <IoEllipsisVertical size={24} />
            <h6 className="mb-0 ms-2">Not Published</h6>
            <GoCircleSlash className="ms-3" />
          </div>
        </div>
  
        <FormControl
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Enter quiz title"
          className="mb-3"
        />
  
        <h5>Quiz Instructions</h5>
        <FormControl
          as="textarea"
          rows={6}
          placeholder="Enter quiz instructions"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          className="mb-4"
        />
  
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <FormControl
            type="number"
            value={quizPoints}
            onChange={(e) => setQuizPoints(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Quiz Type</Form.Label>
          <FormSelect defaultValue="Graded Quiz">
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </FormSelect>
        </Form.Group>
  
        <Form.Group className="mb-4">
          <Form.Check type="checkbox" label="Shuffle Answers" />
          <div className="d-flex align-items-center mt-2">
            <Form.Check type="checkbox" label="Time Limit" className="me-3" />
            <FormControl
              type="number"
              size="sm"
              placeholder="Minutes"
              style={{ width: "100px" }}
            />
          </div>
        </Form.Group>
  
        <h5>Assign</h5>
        <FormControl value="Everyone" readOnly className="mb-2" />
        <Form.Group className="mb-2">
          <Form.Label>Due Date</Form.Label>
          <FormControl
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>
  
        <div className="d-flex gap-3 mb-4">
          <Form.Group>
            <Form.Label>Available From</Form.Label>
            <FormControl
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Until</Form.Label>
            <FormControl
              type="date"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </Form.Group>
        </div>
  
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSaveQuiz}>
            Save & View
          </Button>
        </div>
      </div>
    );
  }
  