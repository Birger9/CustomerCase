import { useState } from "react";
import InventoryTable from "../Components/InventoryTable";
import Nav from "../Components/Nav/Nav";

//import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom";

export const InventoryPage: React.FC = () => {
    // Used for snackbar.
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    //const navigate = useNavigate();
    //const handleGoToRegister = () => navigate("/register");
    
    const handleClose = () => {
        setOpen(false);
    };

    const openSnackBar = (msg: string) => {
        setOpen(true);
        setMsg(msg);
    };

    function createData(
        productNumber: string,
        city: string,
        balance: number,
    ) {
        return { productNumber, city, balance, };
    }
      
    const rows = [
        createData('JTelefon', "Cupertino", 170000),
        createData('JTelefon', "Norrköping", 55000),
        createData('JTelefon', "Frankfurt", 101700)
    ]

    return (
        <div>
            <Nav />
            <InventoryTable rows={rows} />
        </div>
    );
}