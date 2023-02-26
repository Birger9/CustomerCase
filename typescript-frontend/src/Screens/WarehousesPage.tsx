import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import WarehousesTable from "../Components/WarehousesTable";

//import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CreateNewWarehouseDialog from "../Components/CreateNewWarehouseDialog";

export const WarehousesPage: React.FC = () => {
    // Used for snackbar.
    const [, setOpen] = useState(false);
    const [, setMsg] = useState("");
    
    const handleClose = () => {
        setOpen(false);
    };

    const openSnackBar = (msg: string) => {
        setOpen(true);
        setMsg(msg);
    };

    const [warehouses, setWarehouses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof (Storage) !== "undefined") {
            let token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
            }
        }
        else {
            navigate("/");
        }

        const getWarehouses = async () => {
            try {
                const { data, status } = await axios.get(
                  'http://localhost:4000/warehouses',
                  {
                    headers: {
                      Accept: 'application/json',
                      Authorization: "Bearer " + localStorage.getItem("token")
                    },
                  },
                );
    
                if(status === 200) {
                    setWarehouses(data);
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

        getWarehouses();
    }, [])

    return (
        <div>
            <Nav />
            <WarehousesTable rows={warehouses} />
            <CreateNewWarehouseDialog />
        </div>
    );
}