import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import ProductsTable from "../Components/ProductsTable";

//import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom";

export const ProductsPage: React.FC = () => {
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

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getInventory = async () => {
            try {
                const { data, status } = await axios.get(
                  'http://localhost:4000/products',
                  {
                    headers: {
                      Accept: 'application/json',
                      Authorization: "Bearer " + localStorage.getItem("token")
                    },
                  },
                );
    
                if(status === 200) {
                    setProducts(data);
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
            <ProductsTable rows={products} />
        </div>
    );
}