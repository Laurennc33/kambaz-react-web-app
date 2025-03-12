import Lab1 from "./lab1";
import Lab2 from "./lab2";
import Lab3 from "./lab3";
import Lab4 from "./lab4";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import store from "./store";
import { Provider } from "react-redux";

export default function Labs() {
  return (
    <Provider store={store}>
      <div>
        <h1>Lauren Cummings</h1>
        <h2>Labs</h2>
        <TOC />
        <Routes>
          <Route path="/" element={<Navigate to="Lab1" />} />
          <Route path="Lab1" element={<Lab1 />} />
          <Route path="Lab2/*" element={<Lab2 />} />
          <Route path="Lab3/*" element={<Lab3 />} />
          <Route path="Lab4/*" element={<Lab4 />} />
        </Routes>
      </div>
    </Provider>
);}


