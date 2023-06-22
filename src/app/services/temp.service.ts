import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TempModel } from '../models/temp.model';

@Injectable({
  providedIn: 'root',
})
export class TempService {
  baseUrl = '/api/temp';

  constructor(private http: HttpClient) {}

  getAllTemps = () =>
    this.http.get(this.baseUrl).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result as TempModel[];
        // console.log(data);
        return data;
      })
    );

  getATemp = (id: number) =>
    this.http.get(this.baseUrl + `/${id}`).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result;
        return data[0];
      })
    );
}
