import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { FaCheckCircle } from "react-icons/fa";


export default function ModulesControls () {
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
                    <Dropdown.Item href="#/action-1"><FaCheckCircle className="text-success me-1"/>Publish all modulues </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Publish modules only</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="danger me-1">+ Module</Button>
            
        </div>
    );
}