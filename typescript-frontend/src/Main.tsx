import { Routes, Route } from 'react-router-dom';

// Own files.
import { LoginPage } from './Screens/LoginPage';
import { MainPage } from './Screens/MainPage';

const Main = () => {
    return (     
        <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/home' element={<MainPage/>} />
        </Routes>
    );
}
export default Main;