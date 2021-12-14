import { Action, createReducer, on } from "@ngrx/store";
import { Employee } from "src/app/shared/models/employee-model";
import { addEmp, deleteEmp, updateEmp } from "./employees.actions";
import { EmployeesInitialState } from "./employees.state";

const _employeeReducer = createReducer(
    EmployeesInitialState,

    on(addEmp, (state, action) => {
        return {
            ...state,
            employees: [...state.employees, action.employee]
        }
    }),

    on(deleteEmp, (state, action) => {
        return {
            ...state,
            employees: state.employees.filter((val, idx, arr) => idx !== action.employeeIndex)
        }
    }),

    on(updateEmp, (state, action) => {
        return {
            ...state,
            employees: state.employees.map((val, idx) => {
                if(idx == action.employeeIndex) {
                    return {
                        ...val, 
                        ...{
                           empName: action.employeeData.empName,
                           empDpt: action.employeeData.empDpt
                       }
                    }        
                } 
                else return val;
            })
        }
    })
)

export function employeesReducer(state: {employees: Employee[]} | undefined, action: Action) {
    return _employeeReducer(state, action);
}