import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../appModels/employee.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../appServices/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  modalReference: NgbModalRef | undefined;

  empForm: FormGroup;
  showModal:boolean = false;
  
  editMode:boolean = false;
  employees: Employee[] = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private empService:EmployeeService
    ) { 
      this.empForm = this.fb.group({
        _id: [''],
        name: ['Ex. Alex Johnson', Validators.required],
        position: ['Ex. Full Stack Developer', Validators.required],
        dept: ['Development']
      })
    }

  ngOnInit(): void {
    console.log(this.showModal);
    this.getEmployees();
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Ex. Alex Johnson', Validators.required],
      position: ['Ex. Full Stack Developer', Validators.required],
      dept: ['Development']
    })
  }

  openModal(content: any) {
    this.modalReference = this.modalService.open(content);
  }

  closeModal() {
    this.modalReference?.close();
  }

  getEmployees(){
    this.empService.getEmployeeList().subscribe((res: any)=>{
      console.log(res);
      this.employees = res;
    })
  }

  onEditEmployee(emp: any, content: any){
    this.showModal = true;
    this.editMode = true;
    this.empForm.patchValue(emp);

    this.modalReference = this.modalService.open(content);
  }

  onDeleteEmployee(id: string){
    if(confirm('Do you want to delete this Employee?')){
      this.empService.deleteEmployee(id).subscribe(
        (res)=>{
          console.log('Deleted Successfully');
          this.getEmployees();
        },
        (err)=>{
          console.log(err);
        },
      )
    }
 
  }

  onEmpSubmit(){

    if(this.empForm.valid){

     // console.log(this.empForm.value);
     if(this.editMode){
       this.empService.updateEmployee(this.empForm.value).subscribe(
         (res) =>{
           console.log(res);
           this.getEmployees();
         },
         (err) =>{
           console.log(err);
         },
       )

    } else{

      this.empService.addEmployee(this.empForm.value).subscribe(
        (res)=>{
          console.log(res);
          this.getEmployees();
        },
        (err)=>{
          console.log(err);
        }
      );

    }
 
      this.empForm.reset({
        name: 'Ex. Alex Johnson',
        position: 'Ex. Full Stack Developer',
        dept: 'Development'
      });
      this.onCloseModal();

    } else{

      const key =Object.keys(this.empForm.controls);
      //console.log(key)
  
      key.filter(data =>{
        //console.log(data);
        let control = this.empForm.controls[data];
        //console.log(control);
        if(control.errors !=null){
          control.markAsTouched();
        }
      });
      
    }

  }

  onAddEmployee(){
    this.showModal = true;
    console.log(this.showModal)
  }
  
  onCloseModal(){
    this.showModal = false;
    this.editMode = false;
    this.closeModal();
  }



  // onEmpSubmit(){
  //   if(this.empForm.valid){
  //    // console.log(this.empForm.value);
  //    if(this.editMode){
  //      this.empService.updateEmployee(this.empForm.value).subscribe(
  //        (res) =>{
  //          console.log(res);
  //          this.getEmployees();
  //        },
  //        (err) =>{
  //          console.log(err);
  //        },
  //      )
  //   }else{
  //     this.empService.addEmployee(this.empForm.value).subscribe(
  //       (res)=>{
  //         console.log(res);
  //         this.getEmployees();
  //       },
  //       (err)=>{
  //         console.log(err);
  //       },
  //     )
  //   }



 
  //     this.empForm.reset({
  //       name: 'Ex. Alex Johnson',
  //       position: 'Ex. Full Stack Developer',
  //       dept: 'Development'
  //     });
  //     this.onCloseModal();

  //   }else{

  //   }

  //   key =Object.keys(this.empForm.controls);
  //   //console.log(key)

  //   key.filter(data =>{
  //     //console.log(data);
  //     let control = this.empForm.controls[data];
  //     //console.log(control);
  //     if(control.errors !=null){
  //       control.markAsTouched();
  //     }
  //   })
  // }

}



