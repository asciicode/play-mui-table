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
    case payrollActionTypes.CHANGE_DAY_PROP: {
      // console.log('action.payload', action.payload)
      const ndx = state.findIndex(rec => rec.employeeId === action.payload.employeeId);
      let newRec = { ...state[ndx], ...action.payload }
      const qtyTotal = (!isNaN(parseInt(newRec.qtyM, 10)) ?  parseInt(newRec.qtyM, 10) : 0) 
        + (!isNaN(parseInt(newRec.qtyT, 10)) ?  parseInt(newRec.qtyT, 10) : 0)
        + (!isNaN(parseInt(newRec.qtyW, 10)) ?  parseInt(newRec.qtyW, 10) : 0)
        + (!isNaN(parseInt(newRec.qtyTh, 10)) ?  parseInt(newRec.qtyTh, 10) : 0)
        + (!isNaN(parseInt(newRec.qtyF, 10)) ?  parseInt(newRec.qtyF, 10) : 0)
        + (!isNaN(parseInt(newRec.qtyS, 10)) ?  parseInt(newRec.qtyS, 10) : 0)  
        // console.log(!isNaN(parseInt(newRec.qtyT, 10)), qtyTotal);
      const totalAmt = newRec.rate * qtyTotal;
      newRec = { ...newRec, qtyTotal, totalAmt: totalAmt.toFixed(2) }
      state.splice(ndx, 1, newRec)
      return [...state];
    }
    default:
      throw new Error(`Unhandled type ${action.type}`);
  }
}

export const payrollActionTypes = {
  ADD: "add",
  ADD_ALL: "add_all",
  DELETE: "delete",
  CHANGE_DAY_PROP: "change_prop"
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

  const changeDayProp = (field) => {
    // console.log(field);
    dispatch({ type: payrollActionTypes.CHANGE_DAY_PROP, payload: field});
  }
  return [state, add, removeById, changeDayProp];
}

// function employeeReducer(state, action) {}

// const employeeActionTypes = {};
