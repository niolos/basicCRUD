import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../models/user';
import { UsersService } from '../services/users.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService:UsersService, private router: Router, private route:ActivatedRoute, private datePipe: DatePipe) { }

  formatDate(){
    this.createUser?.get("dob")?.setValue(this.datePipe.transform(this.createUser?.get("dob")?.value,"yyyy-MM-dd"))
  
    }
     
     
    getUser!: Users
    createUser!: FormGroup
  
    updateUser() :void{
      this.userService.updateUser(this.route.snapshot.params["id"], this.createUser.value).subscribe({
        next:(res)=>{
          Swal.fire({
            icon: 'success',
            title: 'Update Successful',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/main'])
        },
        error:(err)=>{
          alert(err)
        }
      })
      console.log('subscriber info retrieved')
    }
  
    ngOnInit(): void {
      
      this.userService.getUserById(this.route.snapshot.params['id']).subscribe(user=> {
        this.getUser = user;
        this.createUser = new FormGroup({
          fName: new FormControl(user.fName),
          lName: new FormControl(user.lName),
          email:new FormControl(user.email),
          tele:new FormControl(user.tele),
          alias:new FormControl(user.alias),
          dob: new FormControl(user.dob)
        })
        this.formatDate()
      });
      console.log('User info retrieved')
    }

}
