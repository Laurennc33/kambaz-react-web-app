import { Button, Table } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "./quizcontext"; // 👈 Import the context

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { questions } = useQuiz(); // 👈 Get questions from context

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center gap-3">
        <Button
          className="btn btn-lg btn-light btn-outline-secondary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Preview`, {
              state: { questions }, // 👈 Pass questions just in case
            })
          }
        >
          Preview
        </Button>

        <Button
          className="btn btn-lg btn-light btn-outline-secondary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`)
          }
        >
          <FaPencil className="me-2" />
          Details
        </Button>

        <Button
          className="btn btn-lg btn-light btn-outline-secondary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions`)
          }
        >
          Questions
        </Button>
      </div>

      <hr />
      <h2>Q1 - HTML</h2>
      <br />

      <div className="list-group rounded-0 w-100" style={{ maxWidth: "600px" }}>
        <div className="container">
          <div className="row mb-2">
            <div className="col-6 text-end fw-bold">Quiz Type</div>
            <div className="col-6 text-start">Graded Quiz</div>

            <div className="col-6 text-end fw-bold">Points</div>
            <div className="col-6 text-start">29</div>

            <div className="col-6 text-end fw-bold">Assignment Group</div>
            <div className="col-6 text-start">QUIZZES</div>

            <div className="col-6 text-end fw-bold">Shuffle Answers</div>
            <div className="col-6 text-start">No</div>

            <div className="col-6 text-end fw-bold">Time Limit</div>
            <div className="col-6 text-start">30 Minutes</div>

            <div className="col-6 text-end fw-bold">Multiple Attempts</div>
            <div className="col-6 text-start">No</div>

            <div className="col-6 text-end fw-bold">View Responses</div>
            <div className="col-6 text-start">Always</div>

            <div className="col-6 text-end fw-bold">Show Correct Answers</div>
            <div className="col-6 text-start">Immediately</div>

            <div className="col-6 text-end fw-bold">One Question at a Time</div>
            <div className="col-6 text-start">Yes</div>

            <div className="col-6 text-end fw-bold">Require Respondus LockDown Browser</div>
            <div className="col-6 text-start">No</div>

            <div className="col-6 text-end fw-bold">Required to View Quiz Results</div>
            <div className="col-6 text-start">No</div>

            <div className="col-6 text-end fw-bold">Webcam Required</div>
            <div className="col-6 text-start">No</div>

            <div className="col-6 text-end fw-bold">Lock Questions After Answering</div>
            <div className="col-6 text-start">No</div>
          </div>
        </div>
      </div>

      <br />
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sep 21 at 1am</td>
              <td>Everyone</td>
              <td>Sep 21 at 11:40am</td>
              <td>Sep 21 at 1pm</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
