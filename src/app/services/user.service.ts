import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="/api/users"
  addUser=(user:UserModel)=>
  {
   if(user.id==0)
       return this.http.post(this.baseUrl,user);
   else
       return this.http.put(`${this.baseUrl}/${user.id}`,user);
  }

  getUsers=(page=1,limit=10)=>
           this.http.get(this.baseUrl+`?_page=${page}&_limit=${limit}`,{observe:'response'})
           .pipe(
            map(response=> {
              const count= parseInt(response.headers.get('X-Total-Count')||"0",10);
              const users= response.body as UserModel[]
              return {users,count}
            })
           )

   getById= (id:number)=> this.http.get<UserModel>(this.baseUrl+`/${id}`)
 
   delete= (id:number)=> this.http.delete<any>(this.baseUrl+`/${id}`)
          


 

  constructor(private http:HttpClient) { }
}
