import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";


export default function SaveButton({ updateQuiz }: {
    updateQuiz: () => void
}) {
    // export default function AssignmentControls() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        updateQuiz(); // Pass the new assignment data
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);

    };
   


    return (
        <div id="wd-assignment-modules-controls" className="text-nowrap">

            <Button className="btn btn-lg btn-danger" id="wd-add-module-btn"
                onClick={handleSave}>

                Save
            </Button>
            
        </div>
    );
}

