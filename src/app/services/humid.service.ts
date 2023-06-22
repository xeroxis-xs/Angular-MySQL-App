import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HumidModel } from '../models/humid.model';

@Injectable({
  providedIn: 'root',
})
export class HumidService {
  baseUrl = '/api/humid';

  constructor(private http: HttpClient) {}

  getAllHumid = () =>
    this.http.get(this.baseUrl).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result as HumidModel[];
        // console.log(data);
        return data;
      })
    );

  getAHumid = (id: number) =>
    this.http.get(this.baseUrl + `/${id}`).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result;
        return data[0];
      })
    );
}
