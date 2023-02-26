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
import { SelectRightList } from './SelectRightList';


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

export default function CreateNewEmployeeDialog() {
  const [open, setOpened] = useState(false);

  // Used for snackbar.
  const [, setOpen] = useState(false);
  const [, setMsg] = useState("");

  // Hooks used for adding new inventory.
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeRight, setEmployeeRight] = useState("0");

  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    // Reset values
    setPassword("");
    setEmployeeEmail("");
    setEmployeeRight("")
    
    setOpened(false);
  };

  const openSnackBar = (msg: string) => {
    setOpen(true);
    setMsg(msg);
  };

  const CreateNewEmployee = async () => {
    try {
      await axios.post(
        'http://localhost:4000/employees/create',
        { email: employeeEmail, password: password, rights: parseInt(employeeRight) },
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
    setPassword("");
    setEmployeeEmail("");
    setEmployeeRight("")

    setOpened(false);
    window.location.reload();
  };

  const employeeEmailFieldId = "outlined-employee-email";
  const employeePasswordFieldId = "outlined-employee-password";
  const employeeRightFieldId = "outlined-employee-right";

  const rightsList = ["0", "1", "2"];

  return (
    <div>
      <Button 
          onClick={handleClickOpen} 
          variant="contained"
          sx={{'width': '80vw', 'maxWidth': '300px',
          'backgroundColor': Colors.cyan,
          ':hover': {backgroundColor: Colors.cyan}}}
      >
          Create new employee
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Employee
        </BootstrapDialogTitle>
        <DialogContent dividers>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={employeeEmailFieldId}>
              Email
          </InputLabel>
          <StringInputField
              id={employeeEmailFieldId}
              strValue={employeeEmail}
              setStr={setEmployeeEmail}
          />
        </FormControl>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={employeePasswordFieldId}>
              Password
          </InputLabel>
          <StringInputField
              id={employeePasswordFieldId}
              strValue={password}
              setStr={setPassword}
          />
        </FormControl>

        <FormControl 
          sx={{m: 1, width: '80vw', marginTop: '1vh',
          marginBottom: '1vh', maxWidth: '400px'}}
          variant="outlined"
          >
          <InputLabel htmlFor={employeePasswordFieldId}>
              Right
          </InputLabel>
          <SelectRightList
              id={employeeRightFieldId}
              labelId={employeeRightFieldId + "1"}
              value={employeeRight}
              valueList={rightsList}
              setValue={setEmployeeRight}
          />
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={CreateNewEmployee}>
            Create Employee
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}