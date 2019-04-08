import React from "react";
// import { payrollRowEmpty } from "../data/payroll";

function payrollEmployeesReducer(state, action) {
  switch (action.type) {
    case payrollActionTypes.ADD: {
      // console.log(action.payload);
      return [...state, action.payload];
    }
    case payrollActionTypes.ADD_ALL: {
      // console.log(state, action.payload);
      return [...state, ...action.payload];
    }
    case payrollActionTypes.DELETE: {
      // console.log(state, action.payload);
      
      return state.filter(rec => rec.employeeId !== action.payload.id);
    }
    default:
      throw new Error(`Unhandled type ${action.type}`);
  }
}

export const payrollActionTypes = {
  ADD: "add",
  ADD_ALL: "add_all",
  DELETE: "delete"
};

export function usePayrollEmployees(initialState = []) {
  const [state, dispatch] = React.useReducer(
    payrollEmployeesReducer,
    initialState
  );

  const add = payrollEmployee => {
    if (Array.isArray(payrollEmployee))
      dispatch({ type: payrollActionTypes.ADD_ALL, payload: payrollEmployee });
    else dispatch({ type: payrollActionTypes.ADD, payload: payrollEmployee });
  };

  const removeById = id => {
    dispatch({ type: payrollActionTypes.DELETE, payload: { id }});
  }
  return [state, add, removeById];
}

// function employeeReducer(state, action) {}

// const employeeActionTypes = {};
