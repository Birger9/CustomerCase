import { Routes, Route } from 'react-router-dom';

// Own files.
import { LoginPage } from './Screens/LoginPage';
import { InventoryPage } from './Screens/InventoryPage';
import { ProductsPage } from './Screens/ProductsPage';
import { WarehousesPage } from './Screens/WarehousesPage';
import { DeliveriesPage } from './Screens/DeliveriesPage';
import { EmployeePage } from './Screens/EmployeePage';

const Main = () => {
    return (     
        <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/inventory' element={<InventoryPage/>} />
            <Route path='/products' element={<ProductsPage/>} />
            <Route path='/warehouses' element={<WarehousesPage/>} />
            <Route path='/deliveries' element={<DeliveriesPage/>} />
            <Route path='/employee' element={<EmployeePage/>} />
        </Routes>
    );
}
export default Main;