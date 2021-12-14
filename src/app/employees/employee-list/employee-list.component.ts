import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employee-model';
import { EmployeeService } from '../services/employee.service';
import { deleteEmp } from '../store/employees.actions';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = [
    {empName: "Debjeet Nandi", empDpt: "Frontend Development"},
    {empName: "Vasanth Vishnupriya", empDpt: "Fullstack"},
  ];

  constructor(
    private _store: Store<{employees: {employees: Employee[]}}>,
    private _employeeService: EmployeeService  
  ) { }

  ngOnInit(): void {
    this._store.select('employees').subscribe(empData => {
      this.employeeList =  empData.employees;
    });
  }

  onDeleteEmpClick(empIndex: number) {
    this._store.dispatch(deleteEmp({employeeIndex: empIndex}));
  }


  onEditEmpClick(editingEmpIndex: number) {
    this._employeeService.setEditEmpSubject(true);
    this._employeeService.setEditingEmpIndex(editingEmpIndex);
  }

}
