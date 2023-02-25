import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './Screens/LoginPage';

const Main = () => {
    return (         
        <Routes>
        <Route path='/' element={<LoginPage/>} />
    </Routes>
    );
}
export default Main;