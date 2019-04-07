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
    default:
      throw new Error(`Unhandled type ${action.type}`);
  }
}

export const payrollActionTypes = {
  ADD: "add",
  ADD_ALL: "add_all"
};

export function usePayrollEmployees(initialState = []) {
  const [state, dispatch] = React.useReducer(
    payrollEmployeesReducer,
    initialState
  );

  const add = payrollEmployee =>
    dispatch({ type: payrollActionTypes.ADD, payload: payrollEmployee });
  const addAll = payrollEmployees =>
    dispatch({ type: payrollActionTypes.ADD_ALL, payload: payrollEmployees });
  return [state, add, addAll];
}

// function employeeReducer(state, action) {}

// const employeeActionTypes = {};
