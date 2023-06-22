import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PSIModel } from '../models/psi.model';

@Injectable({
  providedIn: 'root',
})
export class PSIService {
  baseUrl = '/api/psi';

  constructor(private http: HttpClient) {}

  getAllPSI = () =>
    this.http.get(this.baseUrl).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result as PSIModel[];
        // console.log(data);
        return data;
      })
    );

  getAPSI = (id: number) =>
    this.http.get(this.baseUrl + `/${id}`).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result;
        return data[0];
      })
    );
}
