import { Route, Routes } from 'react-router-dom';
import './App.css';
import Error from 'pages/Error';
import Main from 'pages/Layout/Main';
import { Home } from 'pages/Home';
import Registration from 'pages/Auth/Registration';
import Login from 'pages/Auth/Login';
import Components  from 'pages/Components';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route index element={<Home />} />

                <Route path="components" element={<Components />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Registration />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
