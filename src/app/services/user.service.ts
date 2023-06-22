import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = '/api/users';
  constructor(private http: HttpClient) {}

  addUser = (data: any) => {
    return this.http.post<any>(this.baseUrl, data);
  };

  updateUser = (data: any) => {
    return this.http.put(`${this.baseUrl}/${data.get('id')}`, data);
  };

  deleteFile = (filename: any) =>
    this.http.delete(`${this.baseUrl}/file/${filename}`);

  getUsers = (page = 1, limit = 10) =>
    this.http.get(this.baseUrl + `?page=${page}&limit=${limit}`).pipe(
      map((response) => {
        const data = response as any;
        // console.log(data);
        return data.result;
      })
    );

  getAllUsers = () =>
    this.http.get(this.baseUrl).pipe(
      map((response) => {
        const data = response as any;
        // console.log(data);
        return data.result;
      })
    );

  getUsersCount = () =>
    this.http.get<any>(this.baseUrl + `/count`).pipe(
      map((response) => {
        // console.log(response);
        const data = response.data;
        // console.log(data);
        return data;
      })
    );

  getById = (id: number) =>
    this.http.get<any>(this.baseUrl + `/${id}`).pipe(
      map((response) => {
        const data = response.result[0];
        return data;
      })
    );

  delete = (id: number) => this.http.delete<any>(this.baseUrl + `/${id}`);

  upload = (file: any) =>
    this.http.post(this.baseUrl, file, {
      reportProgress: true,
      observe: 'events',
    });
}
