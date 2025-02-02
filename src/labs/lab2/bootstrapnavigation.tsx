import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Nav from "react-bootstrap/esm/Nav";

export default function BootstrapNavigation () {
    return (
        <div id="wd-css-navigating-with-tabs">
            <h2>Tabs</h2>
            <Nav variant="tabs">
                <Nav.Item>
                <Nav.Link href="#/Labs/Lab2/Active">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="#/Labs/Lab2/Link1">Link 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="#/Labs/Lab2/Link2">Link 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="#/Labs/Lab2/Disabled" disabled>Disabled</Nav.Link>
                </Nav.Item>
            </Nav>

            <div id="wd-css-navigating-with-cards">
                <h2>
                    Cards
                </h2>
                <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="public/images/IMG_0251.jpg" />
                    <Card.Body>
                    <Card.Title>Glare</Card.Title>
                    <Card.Text>
                        Me and my dogo glaring 
                    </Card.Text>
                    <Button variant="primary">Boldly Go</Button>
                    </Card.Body>
                </Card>
            </div>


        </div>


    )
}