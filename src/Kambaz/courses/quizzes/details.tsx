import { Button, Table } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";


export default function QuizDetails() {
    return (
        <div>
            <div className="d-flex  align-items-center justify-content-center">
                <Button className="btn btn-lg btn-light btn-outline-secondary" id="wd-add-module-btn" >
                    Preview
                </Button>

                <Button className="btn btn-lg btn-light btn-outline-secondary" id="wd-add-module-btn" >
                    <FaPencil className="text-secondary1 me-3" />

                    Edit
                </Button>
            </div>
            <hr />
            <h2>Q1 - HTML</h2>
            <br />
            <br />
            <div className="list-group rounded-0 w-100" style={{ maxWidth: "600px" }}>
                <div className="container ">
                    <div className="row mb-2">
                        <div className="col-6 text-end fw-bold">
                            Quiz Type                </div>
                        <div className="col-6 text-start">
                            Graded Quiz
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Points                </div>
                        <div className="col-6 text-start">
                            29
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Assignment Group                </div>
                        <div className="col-6 text-start">
                            QUIZZES
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Shuffle Answers                </div>
                        <div className="col-6 text-start">
                            No
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Time Limit
                        </div>
                        <div className="col-6 text-start">
                            30 Minutes
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Multiple Attempts                </div>
                        <div className="col-6 text-start">
                            No
                        </div>

                        <div className="col-6 text-end fw-bold">
                            View Responses                </div>
                        <div className="col-6 text-start">
                            Always
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Show Correct Answers                </div>
                        <div className="col-6 text-start">
                            Immediately
                        </div>

                        <div className="col-6 text-end fw-bold">
                            One Question at a Time                </div>
                        <div className="col-6 text-start">
                            Yes
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Require Respondus LockDown Browser               </div>
                        <div className="col-6 text-start">
                            No
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Required to View Quiz Results                </div>
                        <div className="col-6 text-start">
                            No
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Webcam Required                </div>
                        <div className="col-6 text-start">
                            No
                        </div>

                        <div className="col-6 text-end fw-bold">
                            Lock Questions After Answering                </div>
                        <div className="col-6 text-start">
                            No
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div>
                <Table striped>
                    <thead>
                        <tr><th>Due</th><th>For</th><th>Available from</th><th>Until</th></tr>
                    </thead>
                    <tbody>
                        <td className="wd-quiz-due">Sep 21 at 1am</td>
                        <td className="wd-quiz-for">Everyone</td>
                        <td className="wd-quiz-available-from">Sep 21 at 11:40am</td>
                        <td className="wd-quiz-until">Sep 21 at 1pm</td>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

