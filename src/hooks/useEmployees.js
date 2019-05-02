import React from "react";

// TODO : should submit to backend
function employeesReducer(state, action) {
  switch (action.type) {
    case employeeActionTypes.ADD:
      action.payload.employeeId = Math.random(10);
      return [...state, action.payload];
    case employeeActionTypes.DELETE:
      return state.filter(rec => rec.employeeId !== action.payload.id);
    case employeeActionTypes.EDIT:
      const ndx = state.findIndex(
        rec => rec.employeeId === action.payload.employeeId
      );
      let newRec = { ...state[ndx], ...action.payload };
      state.splice(ndx, 1, newRec);
      console.log(state);

      return [...state];
    default:
      throw new Error(`Unhandled type ${action.type}`);
  }
}

const employeeActionTypes = {
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
  LIST: "list"
};

export function useEmployees(
  initialState = [
    {
      employeeId: Math.random(10),
      lastname: "Catadman",
      firstname: "Allen",
      jobDescription: "Developer",
      rate: 45,
      otMultiplier: 1.3,
      sss: 165,
      philHealth: 65
    },
    {
      employeeId: Math.random(10),
      lastname: "Magallon",
      firstname: "Cecille",
      jobDescription: "Developer",
      rate: 42,
      otMultiplier: 1.5,
      sss: 155,
      philHealth: 55
    }
  ]
) {
  const [state, dispatch] = React.useReducer(employeesReducer, initialState);

  const addEmployee = form => {
    dispatch({ type: employeeActionTypes.ADD, payload: { ...form } });
  };

  const deleteEmployee = id => {
    dispatch({ type: employeeActionTypes.DELETE, payload: { id } });
  };

  const editEmployee = form => {
    dispatch({ type: employeeActionTypes.EDIT, payload: { ...form } });
  };

  const listEmployee = () => {
    dispatch({ type: employeeActionTypes.LIST });
  };
  return [state, addEmployee, deleteEmployee, editEmployee, listEmployee];
}

// export const employees = {};
