
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "pages/Error";
import Registration from "pages/Auth/Registration";
import Main from "pages/Layout/Main";
import { Home } from "pages/Home";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Main />} >
          <Route index element={<Home />} />

          <Route path="register" element={<Registration />} />
          <Route path="*" element={<Error />} />
        </Route>
    </Routes>
  );
}

export default App;
