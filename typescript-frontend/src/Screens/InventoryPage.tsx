import { useState } from "react";
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

    return (
        <Nav />
    );
}