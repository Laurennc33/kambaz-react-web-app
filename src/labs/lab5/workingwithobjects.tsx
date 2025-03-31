import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;

export default function WorkingWithObjects() {
  const [module, setModule] = useState({
    id: "m1",
    name: "React Fundamentals",
    description: "Learn the basics of React.",
    course: "CS4550 - Web Development",
  });

  const [assignment, setAssignment] = useState({
    title: "React Assignment",
    score: 85,
    completed: false,
  });

  // Fetch module
  const fetchModule = async () => {
    const response = await fetch(MODULE_API_URL);
    const data = await response.json();
    setModule(data);
  };

  // Fetch assignment
  const fetchAssignment = async () => {
    const response = await fetch(ASSIGNMENT_API_URL);
    const data = await response.json();
    setAssignment(data);
  };

  // Update module name
  const updateModuleName = async () => {
    await fetch(`${MODULE_API_URL}/name`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: module.name }),
    });
  };

  // Update module description
  const updateModuleDescription = async () => {
    await fetch(`${MODULE_API_URL}/description`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: module.description }),
    });
  };

  // Update assignment score
  const updateAssignmentScore = async () => {
    await fetch(`${ASSIGNMENT_API_URL}/score`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: assignment.score }),
    });
  };

  // Update assignment completion status
  const updateAssignmentCompleted = async () => {
    await fetch(`${ASSIGNMENT_API_URL}/completed`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: assignment.completed }),
    });
  };

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Module Editing</h4>
      <Button onClick={fetchModule} className="btn btn-primary">
        Get Module
      </Button>
      <div>
        <FormControl
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
          placeholder="Update Module Name"
        />
        <Button onClick={updateModuleName} className="btn btn-primary">
          Update Module Name
        </Button>
      </div>

      <div>
        <FormControl
          value={module.description}
          onChange={(e) => setModule({ ...module, description: e.target.value })}
          placeholder="Update Module Description"
        />
        <Button onClick={updateModuleDescription} className="btn btn-primary">
          Update Module Description
        </Button>
      </div>

      <hr />

      <h4>Assignment Editing</h4>
      <Button onClick={fetchAssignment} className="btn btn-primary">
        Get Assignment
      </Button>
      <div>
        <FormControl
          type="number"
          value={assignment.score}
          onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })}
          placeholder="Update Assignment Score"
        />
        <Button onClick={updateAssignmentScore} className="btn btn-primary">
          Update Score
        </Button>
      </div>

      <div>
        <label>
          Completed:
          <input
            type="checkbox"
            checked={assignment.completed}
            onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
          />
        </label>
        <Button onClick={updateAssignmentCompleted} className="btn btn-primary">
          Update Completion
        </Button>
      </div>
    </div>
  );
}
