import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
  }


  createUser = new FormGroup({
    fName: new FormControl('',(Validators.required)),
    lName: new FormControl('',(Validators.required)),
    email: new FormControl('',(Validators.required,Validators.email)),
    alias: new FormControl('',(Validators.required)),
    dob: new FormControl('',(Validators.required)),
    tele: new FormControl('',(Validators.required))
  })

  newUser():void{
    if(this.createUser.controls['fName'].hasError('required')||this.createUser.controls['lName'].hasError('required')||this.createUser.controls['email'].hasError('required')||this.createUser.controls['alias'].hasError('required')||this.createUser.controls['dob'].hasError('required')||this.createUser.controls['tele'].hasError('required')) {
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/addUser'])
    }
    else if(this.createUser.controls['email'].hasError('email')){
      Swal.fire({
        icon:"error",
        title:"Please enter a valid email"
    })
    this.router.navigate(['/addUser'])

    }else{
      this.userService.createUser(this.createUser.value).subscribe({
        next:(res)=>{
          Swal.fire({
            icon: 'success',
            title: 'User Successfully Added',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/'])
        },
        error:(err)=>{
          alert(err)
        }
      })
      console.log('User created')
    }
  }
}
