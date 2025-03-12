import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { FaCheckCircle } from "react-icons/fa";
import ModuleEditor from "./moduleeditor";
import { useState } from "react";

export default function ModulesControls ({
    moduleName, 
    setModuleName, 
    addModule, 
}:{ 
    moduleName: string; 
    setModuleName: (title: string) => void; 
    addModule: () => void; 
}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="secondary me-1">Expand All</Button>
            <Button variant="secondary me-1">View Progress</Button>
            <Dropdown className="d-inline me-1">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Publish All
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"><FaCheckCircle className="text-success me-1"/>Publish All</Dropdown.Item>
                    <Dropdown.Item href="#/action-1"><FaCheckCircle className="text-success me-1"/>Publish all modules </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Publish modules only</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button onClick={handleShow} variant="danger me-1">+ Module</Button>
            <ModuleEditor 
            show={show} 
            handleClose={handleClose} 
            dialogTitle="Add New Module"
            moduleName={moduleName} 
            setModuleName={setModuleName} 
            addModule={addModule} />

        </div>
    );
}