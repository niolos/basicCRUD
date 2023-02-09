import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../models/user';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2'
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users!: Users[]

  constructor(private Users: UsersService, private route:ActivatedRoute, private router: RouterModule) { }

  getAllUsers():void{
    this.Users.getUsers().subscribe(getUsers=>{
      this.users = getUsers
    })
  }

  deleteUser(id:string): void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Users.deleteUser(id).subscribe({
          next:(res)=>{
            this.getAllUsers()
          },
          error:()=>{
            alert("Error while deleting the product")
          }
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

}
