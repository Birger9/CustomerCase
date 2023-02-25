import { Routes, Route } from 'react-router-dom';

// Own files.
import { LoginPage } from './Screens/LoginPage';
import { InventoryPage } from './Screens/InventoryPage';

const Main = () => {
    return (     
        <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/inventory' element={<InventoryPage/>} />
        </Routes>
    );
}
export default Main;