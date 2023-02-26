import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Colors } from '../Assets/Colors';
import { FormControl, InputLabel } from '@mui/material';
import { StringInputField } from './StringInputField';
import { useState } from 'react';
import axios from 'axios';
import { SNACKBAR_PRODUCT_ALREADY_EXISTS } from '../Assets/Constants';
import { stat } from 'fs';

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

export default function CreateNewProductDialog() {
  const [open, setOpened] = useState(false);

  // Used for snackbar.
  const [, setOpen] = useState(false);
  const [, setMsg] = useState("");

  // Hooks used for adding new product.
  const [productNumber, setProductNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const openSnackBar = (msg: string) => {
    setOpened(true);
    setMsg(msg);
  };

  const CreateNewProduct = async () => {
    try {
      await axios.post(
        'http://localhost:4000/products/create',
        { productNumber: productNumber, name: productName, price: parseInt(productPrice) },
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
    setProductNumber("");
    setProductName("");
    setProductPrice("");

    setOpened(false);
    window.location.reload();
  };

  const productNumberFieldId = "outlined-product-number";
  const productNameFieldId = "outlined-product-name";
  const productPriceFieldId = "outlined-product-price";

  return (
    <div>
      <Button 
          onClick={handleClickOpen} 
          variant="contained"
          sx={{'width': '80vw', 'maxWidth': '200px',
          'backgroundColor': Colors.cyan,
          ':hover': {backgroundColor: Colors.cyan}}}
      >
          Add new product
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          New product
        </BootstrapDialogTitle>
        <DialogContent dividers>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={productNumberFieldId}>
              Product number
          </InputLabel>
          <StringInputField
              id={productNumberFieldId}
              strValue={productNumber}
              setStr={setProductNumber}
          />
        </FormControl>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={productNameFieldId}>
              Product name
          </InputLabel>
          <StringInputField
              id={productNameFieldId}
              strValue={productName}
              setStr={setProductName}
          />
        </FormControl>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={productPriceFieldId}>
              Price
          </InputLabel>
          <StringInputField
              id={productPriceFieldId}
              strValue={productPrice}
              setStr={setProductPrice}
          />
        </FormControl>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={CreateNewProduct}>
            Create product
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}