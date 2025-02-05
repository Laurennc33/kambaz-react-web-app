import { ListGroup } from "react-bootstrap";
import AssignmentControls from "./assignmentcontrols";
import LesonControlButtons from "./lessoncontrolbuttons";
import { BsGripVertical } from "react-icons/bs";

export default function Assignments() {
  return (
    <div>
      <AssignmentControls />

      <ListGroup className="rounded-0 mt-5">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">Assignments</div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a href="#/Kambaz/Courses/1234/Assignments/124" className="wd-assignment-link">A1 - HTML</a>
              <p className="text-muted">
                <span className="multiple-modules">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am | 
                <strong> Due</strong> May 13 at 11:59pm | 100pts
              </p>
              <LesonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a href="#/Kambaz/Courses/1234/Assignments/125" className="wd-assignment-link">A2 - ReactJS Basics</a>
              <p className="text-muted">
                <span className="multiple-modules">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am | 
                <strong> Due</strong> May 20 at 11:59pm | 100pts
              </p>
              <LesonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a href="#/Kambaz/Courses/1234/Assignments/126" className="wd-assignment-link">A3 - Introduction to Biology</a>
              <p className="text-muted">
                <span className="multiple-modules">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am | 
                <strong> Due</strong> May 27 at 11:59pm | 100pts
              </p>
              <LesonControlButtons />
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a href="#/Kambaz/Courses/1234/Assignments/127" className="wd-assignment-link">A4 - Python Data Structures</a>
              <p className="text-muted">
                <span className="multiple-modules">Multiple Modules</span> | <strong>Not available until</strong> May 27 at 12:00am | 
                <strong> Due</strong> June 3 at 11:59pm | 100pts
              </p>
              <LesonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a href="#/Kambaz/Courses/1234/Assignments/128" className="wd-assignment-link">A5 - Linear Algebra Homework</a>
              <p className="text-muted">
                <span className="multiple-modules">Multiple Modules</span> | <strong>Not available until</strong> June 3 at 12:00am | 
                <strong> Due</strong> June 10 at 11:59pm | 100pts
              </p>
              <LesonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a href="#/Kambaz/Courses/1234/Assignments/129" className="wd-assignment-link">A6 - Chemistry Lab Report</a>
              <p className="text-muted">
                <span className="multiple-modules">Multiple Modules</span> | <strong>Not available until</strong> June 10 at 12:00am | 
                <strong> Due</strong> June 17 at 11:59pm | 100pts
              </p>
              <LesonControlButtons />
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a href="#/Kambaz/Courses/1234/Assignments/130" className="wd-assignment-link">A7 - Writing 1111 Essay</a>
              <p className="text-muted">
                <span className="multiple-modules">Multiple Modules</span> | <strong>Not available until</strong> June 17 at 12:00am | 
                <strong> Due</strong> June 24 at 11:59pm | 100pts
              </p>
              <LesonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
