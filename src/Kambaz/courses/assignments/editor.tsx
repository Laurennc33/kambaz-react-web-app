import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form>
        <Form.Group controlId="wd-name" className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={4} defaultValue="The assignment is available online. Submit a link to the landing page of the assignment." />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="wd-points">
            <Form.Label>Points</Form.Label>
            <Form.Control type="number" defaultValue={100} />
          </Form.Group>

          <Form.Group as={Col} controlId="wd-group">
            <Form.Label>Group</Form.Label>
            <Form.Control as="select" defaultValue="Group 1">
              <option value="Group 1">Group 1</option>
              <option value="Group 2">Group 2</option>
              <option value="Group 3">Group 3</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="wd-display-grade-as">
            <Form.Label>Display Grade As</Form.Label>
            <Form.Control as="select" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Grade">Grade</option>
              <option value="Points">Points</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="wd-submission-type">
            <Form.Label>Submission Type</Form.Label>
            <Form.Control as="select" defaultValue="Link">
              <option value="Link">Online</option>
              <option value="File Upload">File Upload</option>
              <option value="Text Entry">Text Entry</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="wd-online-entry-options">
          <Form.Label>Online Entry Options</Form.Label>
          <div>
            <InputGroup>
              <InputGroup.Checkbox id="wd-chkbox-text-entry" />
              <Form.Label className="ms-2" htmlFor="wd-chkbox-text-entry">Text Entry</Form.Label>
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox id="wd-chkbox-website-url" />
              <Form.Label className="ms-2" htmlFor="wd-chkbox-website-url">Website URL</Form.Label>
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox id="wd-chkbox-media-recordings" />
              <Form.Label className="ms-2" htmlFor="wd-chkbox-media-recordings">Media Recordings</Form.Label>
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox id="wd-chkbox-student-annotation" />
              <Form.Label className="ms-2" htmlFor="wd-chkbox-student-annotation">Student Annotation</Form.Label>
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox id="wd-chkbox-file-uploads" />
              <Form.Label className="ms-2" htmlFor="wd-chkbox-file-uploads">File Uploads</Form.Label>
            </InputGroup>
          </div>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="wd-assign-to">
            <Form.Label>Assign To</Form.Label>
            <Form.Control type="text" defaultValue="All Students" />
          </Form.Group>

          <Form.Group as={Col} controlId="wd-due-date">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="wd-available-from">
            <Form.Label>Available From</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group as={Col} controlId="wd-available-until">
            <Form.Label>Available Until</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Row>

        <div className="wd-buttons">
          <Button variant="primary" id="wd-save-button">Save</Button>
          <Button variant="secondary" id="wd-cancel-button" className="ms-2">Cancel</Button>
        </div>
      </Form>
    </div>
  );
}
