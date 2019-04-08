import React from "react";
import {
  Fab,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import EmployeeForm from "./EmployeeForm";

const Dialog = props => {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
    console.log("handleToggle");
  };
  const handleSubmit = form => {
    handleToggle();
    props.onSubmit(form);
  };
  return (
    <>
      <Fab color="secondary" size="small" onClick={handleToggle}>
        <Add />
      </Fab>
      <MuiDialog
        open={open}
        aria-labelledby="form-dialog-title"
        onClose={handleToggle}
      >
        <DialogTitle id="form-dialog-title">Create a New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below.</DialogContentText>
          <EmployeeForm onClose={handleToggle} onSubmit={handleSubmit} />
        </DialogContent>
      </MuiDialog>
    </>
  );
};

export default Dialog;
