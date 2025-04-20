import Button from "react-bootstrap/esm/Button";
import QuizEditor from "./editor"; // Make sure this is the right path to your quiz editor
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function QuizControls(
  // {
  // quizName,
//   setQuizName,
// }: {
//   quizName: string;
//   setQuizName: (title: string) => void;
// }
) {
  const { cid, qid } = useParams();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  useEffect(() => {
    if (qid) {
      setShow(true);
    }
  }, [qid]);

  return (
    <div>
      <input
        placeholder="Search for Quizzes"
        id="wd-search-quiz"
        className="me-2 px-2"
        style={{ borderRadius: "4px", border: "1px solid #ccc", height: "38px" }}
      />
      <Button id="wd-add-quiz-group" variant="secondary me-1">
        + Group
      </Button>
      <Button
        id="wd-add-quiz"
        variant="danger me-1"
        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/NEW`)}
      >
        + Quiz
      </Button>
      <QuizEditor
        // show={show}
        // handleClose={handleClose}
        // dialogTitle="Add new Quiz"
        // quizName={quizName}
        // setQuizName={setQuizName}
      />
    </div>
  );
}
