import { Component } from '@angular/core';

import {
  Employee,
  EmployeeLoaderService
} from './employee-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  employees: Employee[] = [];
  loading = true;

  constructor(svc: EmployeeLoaderService) {
    svc.loadEmployees().subscribe(employees => {
      this.employees = employees;
      this.loading = false;
    });
  }
}
