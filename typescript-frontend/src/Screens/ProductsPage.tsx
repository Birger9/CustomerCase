import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import ProductsTable from "../Components/ProductsTable";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
import CreateNewProductDialog from "../Components/CreateNewProductDialog";

export const ProductsPage: React.FC = () => {
    // Used for snackbar.
    const [, setOpen] = useState(false);
    const [, setMsg] = useState("");
    const [right, setRight] = useState(0);
    
    const openSnackBar = (msg: string) => {
        setOpen(true);
        setMsg(msg);
    };

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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

        const getProducts = async () => {
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

        getProducts();
    }, [])

    return (
        <div>
            <Nav />
            <ProductsTable rows={products} />
            {right >= 1 ? (
                <CreateNewProductDialog />
            ) : ("")}
        </div>
    );
}