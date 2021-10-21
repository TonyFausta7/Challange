import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  fg!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private apiSrv: ApiService, private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
    if(this.data.type === 'add'){
    this.initForm();

    }else{
      this.initFormEdit();
      this.getDataEdit();
    }
   
  }

  initForm(){
    this.fg = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      user_type: ['mentor', [Validators.required]],
      company_name: ['Company', [Validators.required]],
      status: ['pending', [Validators.required]],
    });
  }

  initFormEdit(){
    this.fg = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      user_type: [null, [Validators.required]],
      company_name: ['Company', [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  noClick(){
      this.dialogRef.close();
  }


  getErrorMessage() {
    if (this.fg.controls.email.hasError('required')
      || this.fg.controls.first_name.hasError('required')
      || this.fg.controls.last_name.hasError('required') ) {
      return 'You must enter a value';
    }


    if(this.fg.controls.user_type.hasError('required')){
      return 'You must select a value';
    } 


    return this.fg.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getDataEdit(){
      const newData =  this.data.dataEdit.filter((data:any)=> data._id === this.data.id);
      this.fg.controls.email.patchValue(newData[0].email);
      this.fg.controls.first_name.patchValue(newData[0].first_name);
      this.fg.controls.last_name.patchValue(newData[0].last_name);
      this.fg.controls.user_type.patchValue(newData[0].company.user_type);
      this.fg.controls.status.patchValue(newData[0].user_status);
  }

  add(){
    if(this.fg.invalid){
      return
    }
    this.apiSrv.getDataMentor().subscribe(result=>{
      const id = result.length + 1;
      const body = {
        _id: id.toString(),
        email: this.fg.value.email,
        first_name: this.fg.value.first_name,
        last_name: this.fg.value.last_name,
        company : {
          name: this.fg.value.company_name,
          user_type: this.fg.value.user_type,
        },
        count_document: 15,
        civility: "MR",
        user_status: this.fg.value.status
      }

      result.push(body);

      this.dialogRef.close(result);
    })
  }

  edit(){
    if(this.fg.invalid){
      return
    }
    this.apiSrv.getDataMentor().subscribe(result=>{
      const body = {
        _id: this.data.id,
        email: this.fg.value.email,
        first_name: this.fg.value.first_name,
        last_name: this.fg.value.last_name,
        company : {
          name: this.fg.value.company_name,
          user_type: this.fg.value.user_type,
        },
        count_document: 15,
        civility: "MR",
        user_status: this.fg.value.status
      }

    for (var i in result) {
      if (result[i]._id == this.data.id) {
         result[i] = body;
         break; //Stop this loop, we found it!
      }
    }
      this.dialogRef.close(result);
    })
  }



  delete(){
    // this.apiSrv.deleteMentor(this.data).subscribe(result=>{
    //   console.log(result);
    // })
    this.apiSrv.getDataMentor().subscribe(result=>{
      const newData =  result.filter(data=> data._id !== this.data.id);
      this.dialogRef.close(newData);
    })

  }

}
