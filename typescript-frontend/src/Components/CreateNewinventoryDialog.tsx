import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Colors } from '../Assets/Colors';
import { FormControl, InputLabel } from '@mui/material';
import { StringInputField } from './StringInputField';
import { useState } from 'react';
import axios from 'axios';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CreateNewInventoryDialog() {
  const [open, setOpened] = useState(false);

  // Used for snackbar.
  const [, setOpen] = useState(false);
  const [, setMsg] = useState("");

  // Hooks used for adding new inventory.
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryCity, setInventoryCity] = useState("");
  const [balance, setBalance] = useState("");

  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    // Reset values
    setInventoryCity("");
    setInventoryName("");
    setBalance("");
    
    setOpened(false);
  };

  const openSnackBar = (msg: string) => {
    setOpen(true);
    setMsg(msg);
  };

  const CreateNewInventory = async () => {
    try {
      await axios.post(
        'http://localhost:4000/inventory-balance/create',
        { city: inventoryCity, name: inventoryName, balance: parseInt(balance) },
        {
          headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        },
      );  
    } catch (error) {  
        if (axios.isAxiosError(error)) {
            openSnackBar(error.message);
        } 
        else {
            console.log('unexpected error: ', error);
        }
    }

    // Reset values
    setInventoryCity("");
    setInventoryName("");
    setBalance("");

    setOpened(false);
    window.location.reload();
  };

  const inventoryNameFieldId = "outlined-inventory-name";
  const inventoryCityFieldId = "outlined-inventory-city";
  const inventoryBalanceFieldId = "outlined-inventory-balance";

  return (
    <div>
      <Button 
          onClick={handleClickOpen} 
          variant="contained"
          sx={{'width': '80vw', 'maxWidth': '200px',
          'backgroundColor': Colors.cyan,
          ':hover': {backgroundColor: Colors.cyan}}}
      >
          Add new inventory
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          New inventory
        </BootstrapDialogTitle>
        <DialogContent dividers>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={inventoryNameFieldId}>
              Product name
          </InputLabel>
          <StringInputField
              id={inventoryNameFieldId}
              strValue={inventoryName}
              setStr={setInventoryName}
          />
        </FormControl>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={inventoryCityFieldId}>
              City
          </InputLabel>
          <StringInputField
              id={inventoryCityFieldId}
              strValue={inventoryCity}
              setStr={setInventoryCity}
          />
        </FormControl>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={inventoryBalanceFieldId}>
              Balance
          </InputLabel>
          <StringInputField
              id={inventoryBalanceFieldId}
              strValue={balance}
              setStr={setBalance}
          />
        </FormControl>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={CreateNewInventory}>
            Create inventory
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}