export default function Assignments() {
    return (
      <div id="wd-assignments">
        <input placeholder="Search for Assignments"
               id="wd-search-assignment" />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button> 
        </h3>
        <ul id="wd-assignment-list">
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/123"
               className="wd-assignment-link">
              A1 - ENV + HTML
            </a>
            <p className="wd-assignment-description">
              Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am | 
              <strong> Due</strong> May 13 at 11:59pm | 100pts
            </p>
          </li>
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/124"
               className="wd-assignment-link">
              A2 - ReactJS Basics
            </a>
            <p className="wd-assignment-description">
              Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | 
              <strong> Due</strong> May 20 at 11:59pm | 100pts
            </p>
          </li>
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/125"
               className="wd-assignment-link">
              A3 - Introduction to Biology
            </a>
            <p className="wd-assignment-description">
              Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am | 
              <strong> Due</strong> May 27 at 11:59pm | 100pts
            </p>
          </li>
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/126"
               className="wd-assignment-link">
              A4 - Python Data Structures
            </a>
            <p className="wd-assignment-description">
              Multiple Modules | <strong>Not available until</strong> May 27 at 12:00am | 
              <strong> Due</strong> June 3 at 11:59pm | 100pts
            </p>
          </li>
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/127"
               className="wd-assignment-link">
              A5 - Linear Algebra Homework
            </a>
            <p className="wd-assignment-description">
              Multiple Modules | <strong>Not available until</strong> June 3 at 12:00am | 
              <strong> Due</strong> June 10 at 11:59pm | 100pts
            </p>
          </li>
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/128"
               className="wd-assignment-link">
              A6 - Chemistry Lab Report
            </a>
            <p className="wd-assignment-description">
              Multiple Modules | <strong>Not available until</strong> June 10 at 12:00am | 
              <strong> Due</strong> June 17 at 11:59pm | 100pts
            </p>
          </li>
          <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/129"
               className="wd-assignment-link">
              A7 - Writing 1111 Essay
            </a>
            <p className="wd-assignment-description">
              Multiple Modules | <strong>Not available until</strong> June 17 at 12:00am | 
              <strong> Due</strong> June 24 at 11:59pm | 100pts
            </p>
          </li>
        </ul>
      </div>
    );
  }
  