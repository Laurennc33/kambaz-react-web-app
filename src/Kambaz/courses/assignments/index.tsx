import { ListGroup } from "react-bootstrap";
import AssignmentControls from "./assignmentcontrols";
import LessonControlButtons from "./lessoncontrolbuttons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import * as db from "../../database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter((assignment) => assignment.course === cid);

  return (
    <div>
      <AssignmentControls />
      <ListGroup className="rounded-0 mt-5">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">Assignments</div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((assignment) => (
              <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link">
                  {assignment.title}
                </a>
                <p className="text-muted">
                  <span className="multiple-modules">Multiple Modules</span> | <strong>Description:</strong> {assignment.description}
                </p>
                <LessonControlButtons />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
