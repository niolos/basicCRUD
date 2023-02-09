import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/user';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,map,tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private REST_API_URL = environment.API_URL+'/user'


  private HTTP_HEADER = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  }

  constructor(private http: HttpClient) { }


  getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.REST_API_URL,this.HTTP_HEADER).pipe(
      tap(users =>{
        console.log(users);
       }),
       catchError(error => of([]))
    )
  }

  createUser(users:Users): Observable<Users>{
    return this.http.post<Users>(`${this.REST_API_URL}/create`,users,this.HTTP_HEADER).pipe(
      tap(newUser =>{
        console.log(`this Subscriber = ${newUser}`);
       }),
       catchError(error => of(new Users()))
    )
  }
  
  deleteUser(id:string){
    return this.http.delete<Users>(`${this.REST_API_URL}/delete/${id}`, this.HTTP_HEADER).pipe(
      tap(deleteUser=>{
        console.log(`deleted User= ${deleteUser.fName}`)
      }),
      catchError(error => of(new Users()))
    )
  }

  updateUser(id: String, user: Users):Observable<Users>{
    return this.http.put<Users>(`${this.REST_API_URL}/update/${id}`,user,this.HTTP_HEADER).pipe(
      tap(updateUser =>{
        console.log(`this User = ${updateUser}`);
       }),
       catchError(error => of(new Users()))
    )
  }

  getUserById(id:string): Observable<Users | any>{
    const thisUrl = `${this.REST_API_URL}/find/${id}`
    return this.http.get<Users>(thisUrl).pipe(
      tap(user =>{
        console.log(`this Users = ${user.fName}`);
        
       }),
       catchError(error => of(new Users()))
    )
  }

}


