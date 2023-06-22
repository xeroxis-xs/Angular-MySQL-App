import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TempService } from 'src/app/services/temp.service';
import { Router } from '@angular/router';
import { TempModel } from 'src/app/models/temp.model';

@Component({
  selector: 'app-load-temp',
  templateUrl: './load-temp.component.html',
  styleUrls: ['./load-temp.component.scss'],
})
export class LoadTempComponent implements AfterViewInit {
  dataSource: MatTableDataSource<TempModel>;
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
  temp: TempModel[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadTemps();
  }

  constructor(private tempService: TempService, private router: Router) {}

  loadTemps() {
    this.tempService.getAllTemps().subscribe({
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
    this.loadTemps();
  }

  clickedRows(id: number) {
    this.router.navigate(['/temp/view/' + id]);
    // console.log(id);
  }
}
