import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../appModels/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  addEmployee(emp: Employee){
    return this.http.post(this.url, emp);
  }

  getEmployeeList(){
    return this.http.get(this.url);
  }

  updateEmployee(emp: Employee){
    return this.http.put(`${this.url}/${emp._id}`, emp);
  }

  deleteEmployee(id: string){
    return this.http.delete(`${this.url}/${id}`);
  }
}
