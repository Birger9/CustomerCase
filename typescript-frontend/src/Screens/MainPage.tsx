
import { Container } from "@mui/material";
import { useState } from "react";

import TabOne from "../Components/TabOne";
import Tabs from "../Components/Tabs";
import TabTwo from "../Components/TabTwo";

//import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
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

    type TabsType = {
        label: string;
        index: number;
        Component: React.FC<{}>;
      }[];
      
      // Tabs Array
      const tabs: TabsType = [
        {
          label: "Tab One",
          index: 1,
          Component: TabOne
        },
        {
          label: "Tab Two",
          index: 2,
          Component: TabTwo
        }
      ];
    
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
    return (
        <Container
            sx={{flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'left', width: '100vw'}}
        >
            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
        </Container>
    );
}