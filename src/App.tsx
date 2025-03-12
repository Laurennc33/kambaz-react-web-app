import Kambaz from "./Kambaz";
import Labs from "./labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Kambaz/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
            <Route path="/Project" element={<h1>Project</h1>} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}
