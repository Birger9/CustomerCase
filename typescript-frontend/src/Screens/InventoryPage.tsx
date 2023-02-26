import axios from "axios";
import { useEffect, useState } from "react";
import InventoryTable from "../Components/InventoryTable";
import Nav from "../Components/Nav/Nav";

//import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom";

export const InventoryPage: React.FC = () => {
    // Used for snackbar.
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const [inventory, setInventory] = useState([]);
    
    const handleClose = () => {
        setOpen(false);
    };

    const openSnackBar = (msg: string) => {
        setOpen(true);
        setMsg(msg);
    };
      
    useEffect(() => {
        const getInventory = async () => {
            try {
                const { data, status } = await axios.get(
                  'http://localhost:4000/inventory-balance',
                  {
                    headers: {
                      Accept: 'application/json',
                      Authorization: "Bearer " + localStorage.getItem("token")
                    },
                  },
                );
    
                if(status === 200) {
                    setInventory(data);
                }
            
            } catch (error) {
                
                if (axios.isAxiosError(error)) {
                    openSnackBar(error.message);
                } 
                else {
                    console.log('unexpected error: ', error);
                }
            }
        };

        getInventory();
    }, [])

    return (
        <div>
            <Nav />
            <InventoryTable rows={inventory} />
        </div>
    );
}