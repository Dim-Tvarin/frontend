import { Route, Routes } from 'react-router-dom';
import './App.css';
import Error from 'pages/Error';
import Registration from 'components/RegistrationForm';
import Main from 'pages/Layout/Main';
import { Home } from 'pages/Home';
import Login from 'components/LoginForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
