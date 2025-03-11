import { useSelector } from "react-redux";
import CounterRedux from "./counterredux";
import AddRedux from "./addredux";


export default function HelloRedux() {
  const { message } = useSelector((state: any) => state.helloReducer);
  return (
    <div id="wd-hello-redux">
      <h2>Redux Examples</h2>  
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
      <CounterRedux/>
      <AddRedux/>
    </div>
  );
}

