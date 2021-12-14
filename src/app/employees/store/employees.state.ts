import { Employee } from "src/app/shared/models/employee-model";

export const EmployeesInitialState: {employees: Employee[]} = {
    employees: [
        {empName: "Debjeet Nandi", empDpt: "Frontend Development"},
        {empName: "Vasanth Vishnupriya", empDpt: "Fullstack"},
        {empName: "Meesha Jordan Chase", empDpt: "DBMS"},
    ]
}