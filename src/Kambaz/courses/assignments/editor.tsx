import { Modal, Form, Row, Col, Button, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as assignmentsClient from './client';
import {
  addAssignment as addAssignmentReducer,
  updateAssignment as updateAssignmentReducer,
} from './reducer';

export default function AssignmentEditor({
  show,
  handleClose,
  dialogTitle,
  assignmentName,
  setAssignmentName,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  assignmentName: string;
  setAssignmentName: (name: string) => void;
}) {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);

  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    points: 0,
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
    course: cid,
    group: 'Group 1',
    displayGradeAs: 'Percentage',
    submissionType: 'Online',
    assignTo: 'All Students',
    onlineEntryOptions: {
      textEntry: false,
      websiteURL: false,
      mediaRecordings: false,
      studentAnnotation: false,
      fileUploads: false,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (aid === 'NEW') {
      setAssignment({
        title: '',
        description: '',
        points: 0,
        dueDate: '',
        availableFrom: '',
        availableUntil: '',
        course: cid,
        group: 'Group 1',
        displayGradeAs: 'Percentage',
        submissionType: 'Online',
        assignTo: 'All Students',
        onlineEntryOptions: {
          textEntry: false,
          websiteURL: false,
          mediaRecordings: false,
          studentAnnotation: false,
          fileUploads: false,
        },
      });
    } else {
      const a = assignments.find((aaa: any) => aaa._id === aid);
      if (a) setAssignment(a);
    }
  }, [aid, assignments]);

  useEffect(() => {
    if (show && assignmentName) {
      setAssignment((prev) => ({
        ...prev,
        title: assignmentName,
      }));
    }
  }, [show, assignmentName]);

  const handleSave = async () => {
    if (aid === 'NEW') {
      const newAssignment = await assignmentsClient.createAssignment(assignment);
      dispatch(addAssignmentReducer(newAssignment)); // Update Redux store
    } else {
      const updatedAssignment = await assignmentsClient.updateAssignment(assignment);
      dispatch(updateAssignmentReducer(updatedAssignment)); // Update Redux store
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="wd-name" className="mb-3">
            <Form.Label>Assignment Name</Form.Label>
            <FormControl
              value={assignment.title}
              onChange={(e) => {
                setAssignmentName(e.target.value);
                handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group controlId="wd-description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <FormControl
              as="textarea"
              rows={4}
              name="description"
              value={assignment.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="wd-points">
              <Form.Label>Points</Form.Label>
              <FormControl
                type="number"
                name="points"
                value={assignment.points}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="wd-group">
              <Form.Label>Group</Form.Label>
              <FormControl
                as="select"
                name="group"
                value={assignment.group}
                onChange={handleChange}
              >
                <option value="Group 1">Group 1</option>
                <option value="Group 2">Group 2</option>
                <option value="Group 3">Group 3</option>
              </FormControl>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="wd-display-grade-as">
              <Form.Label>Display Grade As</Form.Label>
              <FormControl
                as="select"
                name="displayGradeAs"
                value={assignment.displayGradeAs}
                onChange={handleChange}
              >
                <option value="Percentage">Percentage</option>
                <option value="Grade">Grade</option>
                <option value="Points">Points</option>
              </FormControl>
            </Form.Group>

            <Form.Group as={Col} controlId="wd-submission-type">
              <Form.Label>Submission Type</Form.Label>
              <FormControl
                as="select"
                name="submissionType"
                value={assignment.submissionType}
                onChange={handleChange}
              >
                <option value="Online">Online</option>
                <option value="File Upload">File Upload</option>
                <option value="Text Entry">Text Entry</option>
              </FormControl>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="wd-assign-to">
              <Form.Label>Assign To</Form.Label>
              <FormControl
                type="text"
                name="assignTo"
                value={assignment.assignTo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="wd-due-date">
              <Form.Label>Due Date</Form.Label>
              <FormControl
                type="date"
                name="dueDate"
                value={assignment.dueDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="wd-available-from">
              <Form.Label>Available From</Form.Label>
              <FormControl
                type="date"
                name="availableFrom"
                value={assignment.availableFrom}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="wd-available-until">
              <Form.Label>Available Until</Form.Label>
              <FormControl
                type="date"
                name="availableUntil"
                value={assignment.availableUntil}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose} className="ms-2">
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
