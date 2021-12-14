import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor() {}

    public editEmpSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public editingEmpIndexSubject: Subject<number | null> =  new Subject<number | null>();

    setEditEmpSubject(setFlag: boolean) {
        this.editEmpSubject.next(setFlag);
    }

    setEditingEmpIndex(empIdx: number | null) {
        this.editingEmpIndexSubject.next(empIdx);
    }
}