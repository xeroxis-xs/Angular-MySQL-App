import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LevelModel } from '../models/level.model';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  baseUrl = '/api/level';

  constructor(private http: HttpClient) {}

  getAllLevel = () =>
    this.http.get(this.baseUrl).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result as LevelModel[];
        // console.log(data);
        return data;
      })
    );

  getAllLevelAndCoord = () =>
    this.http.get(this.baseUrl + '/all').pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result;
        // console.log(data);
        return data;
      })
    );
  getALevel = (id: number) =>
    this.http.get(this.baseUrl + `/${id}`).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result;
        return data[0];
      })
    );
}
