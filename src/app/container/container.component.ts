import { EmployeeComponent } from './../employee/employee.component';
import { AfterContentInit, Component, ContentChild, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(EmployeeComponent) emp!: EmployeeComponent
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterContentInit(): void {
    console.log(this.emp)
    this.emp.empName = "new sarthak"
  }

}
