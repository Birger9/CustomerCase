import axios from "axios";
import { useEffect, useState } from "react";
import InventoryTable from "../Components/InventoryTable";
import Nav from "../Components/Nav/Nav";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
import CreateNewInventoryDialog from "../Components/CreateNewinventoryDialog";

export const InventoryPage: React.FC = () => {
    // Used for snackbar.
    const [, setOpen] = useState(false);
    const [, setMsg] = useState("");
    const [right, setRight] = useState(0);

    const [inventory, setInventory] = useState([]);
    const navigate = useNavigate();
    
    const openSnackBar = (msg: string) => {
        setOpen(true);
        setMsg(msg);
    };
      
    useEffect(() => {
        if (typeof (Storage) !== "undefined") {
            let token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
            } else {
                let data = jwt_decode(token);
                if(data) {
                    const info = JSON.parse(JSON.stringify(data))
                    setRight(info.sub);
                }
            }
        }
        else {
            navigate("/");
        }

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
            {right >= 1 ? (
                <CreateNewInventoryDialog />
            ) : ("")}
        </div>
    );
}