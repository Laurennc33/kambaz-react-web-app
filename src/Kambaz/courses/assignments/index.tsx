import { FormControl, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AssignmentControls from "./assignmentcontrols";
import AssignmentControlButtons from "./assignmentcontrolbuttons";
import * as assignmentsClient from "./client";
import { addAssignment, updateAssignment, deleteAssignment, setAssignments, editAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams(); 
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const [assignmentName, setAssignmentName] = useState(""); 
  
  const fetchAssignments = async () => {
    const assignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, [cid]); 

  const handleAddAssignment = async () => {
    if (!assignmentName || !cid) return;
    
    const newAssignment = {
      title: assignmentName,
      course: cid,
      description: "",
      points: 0,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
      group: "Group 1",
      displayGradeAs: "Percentage",
      submissionType: "Online",
      assignTo: "All Students",
      onlineEntryOptions: {
        textEntry: false,
        websiteURL: false,
        mediaRecordings: false,
        studentAnnotation: false,
        fileUploads: false,
      },
    };

    const createdAssignment = await assignmentsClient.createAssignment(newAssignment);
    dispatch(addAssignment(createdAssignment));
    setAssignmentName(""); 
  };

  const handleUpdateAssignment = async (updatedAssignment: any) => {
    const savedAssignment = await assignmentsClient.updateAssignment(updatedAssignment);
    dispatch(updateAssignment(savedAssignment));
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div>
      <AssignmentControls 
        assignmentName={assignmentName} 
        setAssignmentName={setAssignmentName} 
        addAssignment={handleAddAssignment} 
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
                    {!assignment.editing ? assignment.title : (
                      <FormControl
                        className="w-50 d-inline-block"
                        value={assignment.title}
                        onChange={(e) =>
                          handleUpdateAssignment({ ...assignment, title: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateAssignment({ ...assignment, editing: false });
                          }
                        }}
                      />
                    )}
                  </Link>
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
                  deleteAssignment={() => handleDeleteAssignment(assignment._id)} 
                  editAssignment={() => dispatch(editAssignment(assignment._id))}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
