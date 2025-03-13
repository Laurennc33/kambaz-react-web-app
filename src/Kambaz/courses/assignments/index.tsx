import { FormControl, ListGroup } from "react-bootstrap";
import AssignmentControls from "./assignmentcontrols";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useState } from "react";
import AssignmentControlButtons from "./assignmentcontrolbuttons";

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <AssignmentControls
        assignmentName={assignmentName}
        setAssignmentName={setAssignmentName}
        addAssignment={() => {
          dispatch(addAssignment({ title: assignmentName, course: cid }));
          setAssignmentName("");
        }}
      />
      <ListGroup className="rounded-0 mt-5">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">Assignments</div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((assignment: any) => (
              <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1">
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <Link
                    to={`/Kambaz/courses/${cid}/assignments/${assignment._id}`}
                    className="text-white text-decoration-none"
                  >
                    {!assignment.editing && assignment.title}
                  </Link>
                  {assignment.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      value={assignment._id}
                      onChange={(e) =>
                        dispatch(
                          updateAssignment({ ...assignment, title: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            updateAssignment({ ...assignment, editing: false })
                          );
                        }
                      }}
                    />
                  )}
                </div>
                <div className="assignment-details mt-2">
                  <div className="assignment-description">
                    <strong>Description:</strong> {assignment.description || "N/A"}
                  </div>
                  <div className="assignment-due-date">
                    <strong>Due Date:</strong> {assignment.dueDate || "N/A"}
                  </div>
                  <div className="assignment-points">
                    <strong>Points:</strong> {assignment.points || "N/A"}
                  </div>
                  <div className="assignment-available-until">
                    <strong>Available Until:</strong> {assignment.availableUntil || "N/A"}
                  </div>
                </div>
                <AssignmentControlButtons
                  assignmentId={assignment._id}
                  deleteAssignment={(assignmentId) => {
                    dispatch(deleteAssignment(assignmentId));
                  }}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
