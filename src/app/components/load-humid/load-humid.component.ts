import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TempService } from 'src/app/services/temp.service';
import { Router } from '@angular/router';
import { HumidService } from 'src/app/services/humid.service';
import { HumidModel } from 'src/app/models/humid.model';

@Component({
  selector: 'app-load-humid',
  templateUrl: './load-humid.component.html',
  styleUrls: ['./load-humid.component.scss'],
})
export class LoadHumidComponent {
  dataSource: MatTableDataSource<HumidModel>;
  displayColumns = [
    'id',
    'device_id',
    'name',
    'timestamp_in_response',
    'item_value',
  ];
  isHidden: boolean = true;
  pageSizeOptions = [10, 20, 30, 40, 50];
  pageSize = 10;
  temp: HumidModel[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadHumid();
  }

  constructor(private humidService: HumidService, private router: Router) {}

  loadHumid() {
    this.humidService.getAllHumid().subscribe({
      next: (response) => {
        this.temp = response;
        this.dataSource = new MatTableDataSource(this.temp);
        this.isHidden = false;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error(err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData(event: Event) {
    this.loadHumid();
  }

  clickedRows(id: number) {
    this.router.navigate(['/humid/view/' + id]);
    // console.log(id);
  }
}
