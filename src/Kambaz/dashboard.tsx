import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack Software Developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>


        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2234/Home"
                className="wd-dashboard-course-link">
            <img src="/images/biology.jpg" width={200} />
            <div>
              <h5>Bio1122</h5>
              <p className="wd-dashboard-course-title">
                Introduction to Biology</p>
              <button>Go</button>
            </div>
          </Link>
        </div>


        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3234/Home"
                className="wd-dashboard-course-link">
            <img src="/images/python.jpg" width={200} />
            <div>
              <h5>CS3234 Python</h5>
              <p className="wd-dashboard-course-title">
                Data Science and Machine Learning</p>
              <button>Go</button>
            </div>
          </Link>
        </div>


        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4234/Home"
                className="wd-dashboard-course-link">
            <img src="/images/linear.jpg" width={200} />
            <div>
              <h5>Math 3211</h5>
              <p className="wd-dashboard-course-title">
                Linear Algebra</p>
              <button>Go</button>
            </div>
          </Link>
        </div>


        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5234/Home"
                className="wd-dashboard-course-link">
            <img src="/images/chemistry.jpg" width={200} />
            <div>
              <h5>Chem 1113</h5>
              <p className="wd-dashboard-course-title">
                Introduction to Chemistry</p>
              <button>Go</button>
            </div>
          </Link>
        </div>


        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6234/Home"
                className="wd-dashboard-course-link">
            <img src="/images/writing.jpg" width={200} />
            <div>
              <h5>Writing 1111</h5>
              <p className="wd-dashboard-course-title">
                First Year Writing</p>
              <button>Go</button>
            </div>
          </Link>
        </div>


        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7234/Home"
                className="wd-dashboard-course-link">
            <img src="/images/design.jpg" width={200} />
            <div>
              <h5>Design 2301</h5>
              <p className="wd-dashboard-course-title">
                Desgin for Marketing</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
