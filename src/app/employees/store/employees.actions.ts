import { createAction, props } from "@ngrx/store";
import { Employee } from "src/app/shared/models/employee-model";

export const addEmp = createAction(
    'addEmp',
    props<{employee: Employee}>()
);

export const deleteEmp = createAction(
    'deleteEmp',
    props<{employeeIndex: number}>()
);

export const updateEmp = createAction(
    'updateEmp',
    props<{employeeIndex: number | null, employeeData: Employee}>()
);
