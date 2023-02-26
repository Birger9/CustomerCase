import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import CreateNewDeliveryDialog from "../Components/CreateNewDeliveryDialog";
import DeliveriesTable from "../Components/DeliveriesTable";
import Nav from "../Components/Nav/Nav";

export const DeliveriesPage: React.FC = () => {
    // Used for snackbar.
    const [, setOpen] = useState(false);
    const [, setMsg] = useState("");

    const [right, setRight] = useState(0);

    const [deliveries, setDeliveries] = useState([]);
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

        const getDeliveries = async () => {
            try {
                const { data, status } = await axios.get(
                  'http://localhost:4000/delivery',
                  {
                    headers: {
                      Accept: 'application/json',
                      Authorization: "Bearer " + localStorage.getItem("token")
                    },
                  },
                );
    
                if(status === 200) {
                    setDeliveries(data);
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

        getDeliveries();
    }, [])

    return (
        <div>
            <Nav />
            <DeliveriesTable rows={deliveries} />
            {right >= 1 ? (
                <CreateNewDeliveryDialog />
            ) : ("")}
        </div>
    );
}