import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BuildingModel } from '../models/building.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  baseUrl = '/api/building';

  constructor(private http: HttpClient) {}

  getAllBuilding = () =>
    this.http.get(this.baseUrl).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result as BuildingModel[];
        // console.log(data);
        return data;
      })
    );

  getABuilding = (id: number) =>
    this.http.get(this.baseUrl + `/${id}`).pipe(
      map((response) => {
        // console.log(response);
        const result = response as any;
        const data = result.result;
        return data[0];
      })
    );
}
