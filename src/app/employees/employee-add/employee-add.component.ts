import { Component, OnInit } from '@angular/core';
import { addEmp, updateEmp } from '../store/employees.actions';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employee-model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  empName!: string;
  empDpt!: string;

  isEditing: boolean = false;
  editingEmpIndex!: number | null;

  constructor(
    private _store: Store<{employees: {employees: Employee[]}}>,
    private _employeeService: EmployeeService  
  ) { }

  ngOnInit(): void {
    this._employeeService.editEmpSubject.subscribe(isEditing => {
      this.isEditing = isEditing;
    });
    this._employeeService.editingEmpIndexSubject.subscribe(editingIndex =>  {
      this.editingEmpIndex = editingIndex;
      if(this.editingEmpIndex !== undefined) {
        this.setEditingFieldValues(this.editingEmpIndex);
      }
    });
  }

  onAddEmpBtnClick() {
    if(this.empName.trim() !== '' && this.empDpt.trim() !== '') {
      this._store.dispatch(
        addEmp(
          {
            employee: {empName: this.empName, empDpt: this.empDpt}
          }
        )
      );
      this.empName = '';
      this.empDpt = '';
    }
  }

  setEditingFieldValues(editingIndex: number | null) {
    let editingEmpData: Employee;
    this._store.select('employees').subscribe(empData => {
      if(empData.employees.length > 0) {
        if(editingIndex !== null) {
          editingEmpData = empData.employees[editingIndex];
          this.empName = editingEmpData.empName;
          this.empDpt = editingEmpData.empDpt;
        }
      }
    }); 
  }
 
  onSaveEditClick() {
    //alert(`Save at index ${this.editingEmpIndex}. Emp Name = ${this.empName} Emp Dpt = ${this.empDpt}`);
    this._store.dispatch(
      updateEmp(
        {
          employeeIndex: this.editingEmpIndex,
          employeeData: {empName: this.empName, empDpt: this.empDpt}
        }
      )
    );
    this.empName = '';
    this.empDpt = '';
    this._employeeService.setEditEmpSubject(false);
    this._employeeService.setEditingEmpIndex(null);
  }

}
