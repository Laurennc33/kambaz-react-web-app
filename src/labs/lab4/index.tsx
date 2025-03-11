import { Container } from "react-bootstrap";
import ClickEvent from "./clickevent";
import PassingDataOnEvent from "./passingdataonevent";
import PassingFunctions from "./passingfunctions";
import EventObject from "./eventobject";
import Counter from "./counter";
import BooleanStateVariables from "./booleanstatevariables";
import StringStateVariables from "./stringstatevariables";
import DateStateVariable from "./datestatevariable";
import ObjectStateVariable from "./objectstatevariable";
import ArrayStateVariable from "./arraystatevariable";
import ParentStateComponent from "./parentstatecomponent";
import ReduxExamples from "./reduxexamples";
import TodoList from "./reduxexamples/todos/todolist";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }
    return (
        <Container>
            <h2>Lab 4 - Managing State and User Input with Forms</h2>
            <div>
            <ClickEvent/>
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello} />
            <EventObject />
            <Counter />
            <BooleanStateVariables/>
            <StringStateVariables/>
            <DateStateVariable/>
            <ObjectStateVariable/>
            <ArrayStateVariable/>
            <ParentStateComponent/>
            <ReduxExamples/>
            <TodoList/>
            </div>

        </Container>);}
