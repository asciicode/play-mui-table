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
    case payrollActionTypes.RECALCULATE: {
      // console.log(action.payload.overtime);

      const newState = state.map(rec => {
        // console.log(netEarnings);
        return calculate(action, rec);
      });
      // console.log(newState);
      return [...newState];
    }
    case payrollActionTypes.CHANGE_DAY_PROP: {
      console.log("action.payload", action.payload);
      const ndx = state.findIndex(
        rec => rec.employeeId === action.payload.employeeId
      );
      let newRec = { ...state[ndx], ...action.payload };
      newRec = calculate(action, newRec);

      state.splice(ndx, 1, newRec);
      return [...state];
    }
    default:
      throw new Error(`Unhandled type ${action.type}`);
  }
}

const computeQtyTotal = newRec => {
  const qtyTotal =
    (!isNaN(parseInt(newRec.qtyM, 10)) ? parseInt(newRec.qtyM, 10) : 0) +
    (!isNaN(parseInt(newRec.qtyT, 10)) ? parseInt(newRec.qtyT, 10) : 0) +
    (!isNaN(parseInt(newRec.qtyW, 10)) ? parseInt(newRec.qtyW, 10) : 0) +
    (!isNaN(parseInt(newRec.qtyTh, 10)) ? parseInt(newRec.qtyTh, 10) : 0) +
    (!isNaN(parseInt(newRec.qtyF, 10)) ? parseInt(newRec.qtyF, 10) : 0) +
    (!isNaN(parseInt(newRec.qtyS, 10)) ? parseInt(newRec.qtyS, 10) : 0);

  const otQtyTotal =
    (!isNaN(parseInt(newRec.otQtyM, 10)) ? parseInt(newRec.otQtyM, 10) : 0) +
    (!isNaN(parseInt(newRec.otQtyT, 10)) ? parseInt(newRec.otQtyT, 10) : 0) +
    (!isNaN(parseInt(newRec.otQtyW, 10)) ? parseInt(newRec.otQtyW, 10) : 0) +
    (!isNaN(parseInt(newRec.otQtyTh, 10)) ? parseInt(newRec.otQtyTh, 10) : 0) +
    (!isNaN(parseInt(newRec.otQtyF, 10)) ? parseInt(newRec.otQtyF, 10) : 0) +
    (!isNaN(parseInt(newRec.otQtyS, 10)) ? parseInt(newRec.otQtyS, 10) : 0);
  return [qtyTotal, otQtyTotal];
};

export const payrollActionTypes = {
  ADD: "add",
  ADD_ALL: "add_all",
  DELETE: "delete",
  CHANGE_DAY_PROP: "change_prop",
  RECALCULATE: "recalculate"
};

function calculate(action, newRec) {
  const [qtyTotal, otQtyTotal] = computeQtyTotal(newRec);
  const totalAmt = newRec.rate * qtyTotal;
  const otTotalAmt = newRec.otRate * otQtyTotal;
  const netEarnings = action.payload.overtime
    ? totalAmt + otTotalAmt
    : totalAmt;
  newRec = {
    ...newRec,
    qtyTotal,
    totalAmt: totalAmt.toFixed(2),
    otTotalAmt: otTotalAmt.toFixed(2),
    netEarnings: netEarnings.toFixed(2)
  };
  return newRec;
}

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
    dispatch({ type: payrollActionTypes.DELETE, payload: { id } });
  };

  const changeDayProp = field => {
    // console.log(field);
    dispatch({ type: payrollActionTypes.CHANGE_DAY_PROP, payload: field });
  };

  const recalculate = overtime => {
    dispatch({ type: payrollActionTypes.RECALCULATE, payload: { overtime } });
  };
  return [state, add, removeById, changeDayProp, recalculate];
}

// function employeeReducer(state, action) {}

// const employeeActionTypes = {};
