import Button from "react-bootstrap/esm/Button";
//import { useNavigate } from "react-router-dom";
import AssignmentEditor from "./editor";
import { useState } from "react";

export default function AssignmentControls({
  assignmentName,
  setAssignmentName,
  addAssignment,
}:{
  assignmentName: string;
  setAssignmentName: (title:string) => void;
  addAssignment: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <input 
        placeholder="Search for Assignments" 
        id="wd-search-assignment" 
        className="me-2 px-2" 
        style={{ borderRadius: "4px", border: "1px solid #ccc", height: "38px" }}
      />
      <Button id="wd-add-assignment-group" variant="secondary me-1">
        + Group
      </Button>
      <Button 
        id="wd-add-assignment" 
        variant="danger me-1" 
        onClick={handleShow}
      >
        + Assignment
      </Button>
      <AssignmentEditor
      show={show}
      handleClose={handleClose}
      dialogTitle="Add new Assignment"
      assignmentName={assignmentName}
      setAssignmentName={setAssignmentName}
      addAssignment={addAssignment} />
    </div>
  );
}
