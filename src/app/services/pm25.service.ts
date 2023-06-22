import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PM25Model } from '../models/pm25.model';

@Injectable({
  providedIn: 'root',
})
export class PM25Service {
  baseUrl = '/api/pm25';

  constructor(private http: HttpClient) {}

  getAllPM25 = () =>
    this.http.get(this.baseUrl).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result as PM25Model[];
        // console.log(data);
        return data;
      })
    );

  getAPM25 = (id: number) =>
    this.http.get(this.baseUrl + `/${id}`).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result;
        return data[0];
      })
    );
}
