import React from "react";
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import EmployeeForm from "./EmployeeForm";

const Dialog = props => {
  // console.log(props);
  // const [open, setOpen] = React.useState(false);
  // const handleToggle = () => {
  // setOpen(!open);
  // console.log("handleToggle");
  // };
  const handleSubmit = form => {
    props.onToggle();
    props.onSubmit(form);
  };
  const getTitle = () => {
    const prefix =
      props.data && props.data.employeeId ? "Edit" : "Create a New";
    return `${prefix} Employee`;
  };
  return (
    <>
      <MuiDialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        onClose={props.onToggle}
      >
        <DialogTitle id="form-dialog-title">{getTitle()}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below.</DialogContentText>
          <EmployeeForm
            onClose={props.onToggle}
            onSubmit={handleSubmit}
            addToPayrollBtn={props.addToPayrollBtn}
            data={props.data}
          />
        </DialogContent>
      </MuiDialog>
    </>
  );
};

export default Dialog;
