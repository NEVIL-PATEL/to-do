import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo";

function App() {
  return (
    // Routing
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
