export const payrollRowEmpty = {
  employeeId: 0,
  fullname: "",
  jobDescription: "",

  rate: 0,
  qtyM: "",
  qtyT: "",
  qtyW: "",
  qtyTh: "",
  qtyF: "",
  qtyS: "",
  qtyTotal: "",
  totalAmt: "",

  otRate: "",
  otQtyM: "",
  otQtyT: "",
  otQtyW: "",
  otQtyTh: "",
  otQtyF: "",
  otQtyS: "",
  otQtyTotal: "",
  otTotalAmt: "",

  netEarnings: "",
  sss: 168.25,
  philHealth: (25).toFixed(2)
};

const employees = [
  "Peter Brimer",
  "Tera Gaona",
  "Kandy Liston",
  "Lonna Wrede",
  "Kristie Yard",
  "Raul Host",
  "Yukiko Binger",
  "Velvet Natera",
  "Donette Ponton",
  "Loraine Grim",
  "Shyla Mable",
  "Marhta Sing",
  "Alene Munden",
  "Holley Pagel"
];

const sliceIndex = 4;
// export
// export const tableEmployees = [];

export function generatePayrollRows() {
  console.log("generating payroll rows...");

  let payrollEmployees = [];
  let remainingEmployees = [];
  for (let index = 0; index < employees.length; index++) {
    // let rec = payrollRowEmpty;
    const rate = (Math.floor(Math.random() * 20) + 40).toFixed(2);

    const rec = {
      employeeId: Math.random(10),
      fullname: employees[index],
      jobDescription: "Bundling",
      rate: rate,
      otRate: (rate * 1.3).toFixed(2)
    };
    // console.log({ ...payrollRowEmpty, ...rec });

    if (index >= sliceIndex)
      remainingEmployees.push({ ...payrollRowEmpty, ...rec });
    else payrollEmployees.push({ ...payrollRowEmpty, ...rec });
  }

  return { payrollEmployees, remainingEmployees };
}
