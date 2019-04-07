export const payrollRowEmpty = {
  employeeId: 0,
  fullname: "",
  jobDescription: "",

  rate: 0,
  qtyM: 0,
  qtyT: 0,
  qtyW: 0,
  qtyTh: 0,
  qtyF: 0,
  qtyS: 0,
  qtyTotal: 0,
  totalAmt: 0,

  otRate: 0,
  otQtyM: 0,
  otQtyT: 0,
  otQtyW: 0,
  otQtyTh: 0,
  otQtyF: 0,
  otQtyS: 0,
  otQtyTotal: 0,
  otTotalAmt: 0,

  netEarnings: 0,
  sss: 0,
  philHealth: 0
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

const sliceIndex = 10;
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
