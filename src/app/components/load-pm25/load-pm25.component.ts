import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PM25Service } from 'src/app/services/pm25.service';
import { Router } from '@angular/router';
import { PM25Model } from 'src/app/models/pm25.model';

@Component({
  selector: 'app-load-pm25',
  templateUrl: './load-pm25.component.html',
  styleUrls: ['./load-pm25.component.scss'],
})
export class LoadPm25Component implements AfterViewInit {
  dataSource: MatTableDataSource<PM25Model>;
  displayColumns = ['id', 'name', 'timestamp_in_response', 'item_value'];
  isHidden: boolean = true;
  pageSizeOptions = [10, 20, 30, 40, 50];
  pageSize = 10;
  temp: PM25Model[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadPM25();
  }

  constructor(private pm25Service: PM25Service, private router: Router) {}

  loadPM25() {
    this.pm25Service.getAllPM25().subscribe({
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
    this.loadPM25();
  }

  clickedRows(id: number) {
    this.router.navigate(['/pm25/view/' + id]);
    // console.log(id);
  }
}
