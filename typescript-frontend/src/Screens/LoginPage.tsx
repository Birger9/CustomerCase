import {Container, Paper, Button, FormControl, InputLabel, Snackbar, Alert, Stack} from '@mui/material';
import { useState } from "react";
import axios from 'axios';
//import { useNavigate } from "react-router-dom";

import { Colors } from "../Assets/Colors";
import { EmailInputField } from "../Components/EmailInputField";
import { PasswordInputField } from "../Components/PasswordInputField";
import { stat } from 'fs';

export const LoginPage: React.FC = () => {

    // Hooks used for password checks.
    const [password, setPassword] = useState("");

    // Hooks used for email checks.
    const [email, setEmail] = useState("");

    // Used for snackbar.
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    // Constants
    const passwordFieldId = "outlined-adornment-password";
    const emailFieldId = "outlined-email";

    //const navigate = useNavigate();
    //const handleGoToRegister = () => navigate("/register");
    
    const handleClose = () => {
        setOpen(false);
    };

    const openSnackBar = (msg: string) => {
        setOpen(true);
        setMsg(msg);
    };
  
    type LoginUserResponse = {
        access_token: string; // Access token
    };

    const loginUser = async () => {
        try {
            const { data, status } = await axios.post<LoginUserResponse>(
              'http://localhost:4000/auth/login',
              { username: email, password: password },
              {
                headers: {
                  Accept: 'application/json',
                },
              },
            );
        
            if(status === 201) {
                let accessToken = data.access_token;
                localStorage.setItem("token", accessToken);
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

    return (
        <Container
            sx={{flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', width: '100vw'}}
        >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}} sx={{marginTop: '7vh'}}
            >
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
    
            <h1>Login</h1>
            <Paper 
                elevation={0}
                sx={{display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    width: '85vw', maxWidth: '400px', padding: '20px',
                    backgroundColor: Colors.transparentWhite}}>
    
                <FormControl 
                    sx={{m: 1, width: '80vw', marginTop: '1vh',
                    marginBottom: '1vh', maxWidth: '400px'}}
                    variant="outlined"
                >
                    <InputLabel htmlFor={emailFieldId}>
                        Email
                    </InputLabel>
                    <EmailInputField
                        id={emailFieldId}
                        email={email}
                        setEmail={setEmail}
                    />
                </FormControl>
    
                <FormControl 
                    sx={{m: 1, width: '80vw', marginTop: '1vh',
                    marginBottom: '1vh', maxWidth: '400px'}}
                    variant="outlined"
                >
                    <InputLabel htmlFor={passwordFieldId}>
                        Password
                    </InputLabel>
                    <PasswordInputField 
                        id={passwordFieldId}
                        password={password}
                        setPassword={setPassword}
                    />
                </FormControl>

                <Stack direction="row" spacing={2}>
                    <Button 
                        onClick={loginUser} 
                        variant="contained"
                        sx={{'width': '80vw', 'maxWidth': '200px',
                        'backgroundColor': Colors.cyan,
                        ':hover': {backgroundColor: Colors.cyan}}}
                    >
                        Login
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}