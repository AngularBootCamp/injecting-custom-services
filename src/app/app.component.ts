import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  Employee,
  EmployeeLoaderService
} from './employee-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent implements OnDestroy {
  employees: Employee[] = [];
  loading = true;
  subscription: Subscription;

  constructor(svc: EmployeeLoaderService) {
    // Since this component doesn't know the "source" of the observable,
    // it is a good practice to perform "clean-up" on it via the OnDestroy hook
    this.subscription = svc.loadEmployees().subscribe(employees => {
      this.employees = employees;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
