import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../lab4/reduxexamples/helloredux/helloreducer";
import counterReducer from "../lab4/reduxexamples/counterredux/counterreducer";
import addReducer from "../lab4/reduxexamples/addredux/addreducer";
import todosReducer from "../lab4/reduxexamples/todos/todosreducer";

const store = configureStore({
  reducer: { 
    helloReducer,
    counterReducer,
    addReducer, 
    todosReducer,
}});
export default store;

