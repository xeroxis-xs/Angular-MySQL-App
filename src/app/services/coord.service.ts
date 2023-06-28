import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CoordModel } from '../models/coordinates.model';

@Injectable({
  providedIn: 'root',
})
export class CoordService {
  baseUrl = '/api/coord';

  constructor(private http: HttpClient) {}

  getAllCoord = () =>
    this.http.get(this.baseUrl).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result as CoordModel[];
        // console.log(data);
        return data;
      })
    );

  getAllCoordFromLevel = (id: any) =>
    this.http.get(this.baseUrl + `/?level_id=${id}`).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result as CoordModel[];
        // console.log(data);
        return data;
      })
    );

  getACoord = (id: number) =>
    this.http.get(this.baseUrl + `/${id}`).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result;
        return data[0];
      })
    );
}
