import Button from "react-bootstrap/esm/Button";

export default function AssignmentControls() {
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
      >
        + Assignment
      </Button>
    </div>
  );
}
