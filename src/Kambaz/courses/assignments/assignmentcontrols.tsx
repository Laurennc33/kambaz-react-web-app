import Button from "react-bootstrap/esm/Button";
import AssignmentEditor from "./editor";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function AssignmentControls({
  assignmentName,
  setAssignmentName,
}:{
  assignmentName: string;
  setAssignmentName: (title:string) => void;
  addAssignment: () => void;
}) {
  const {cid, aid} = useParams();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  }
  

  useEffect(() => {
    if(aid) {
      setShow(true)
    }
  }, [aid])

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
        onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/NEW`) }
      >
        + Assignment
      </Button>
      <AssignmentEditor
      show={show}
      handleClose={handleClose}
      dialogTitle="Add new Assignment"
      assignmentName={assignmentName}
      setAssignmentName={setAssignmentName}
       />
    </div>
  );
}
