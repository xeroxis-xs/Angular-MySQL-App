import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PSIService } from 'src/app/services/psi.service';
import { Router } from '@angular/router';
import { PSIModel } from 'src/app/models/psi.model';

@Component({
  selector: 'app-load-psi',
  templateUrl: './load-psi.component.html',
  styleUrls: ['./load-psi.component.scss'],
})
export class LoadPsiComponent implements AfterViewInit {
  dataSource: MatTableDataSource<PSIModel>;
  displayColumns = ['id', 'name', 'timestamp_in_response', 'item_value'];
  isHidden: boolean = true;
  pageSizeOptions = [10, 20, 30, 40, 50];
  pageSize = 10;
  temp: PSIModel[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadPSI();
  }

  constructor(private psiService: PSIService, private router: Router) {}

  loadPSI() {
    this.psiService.getAllPSI().subscribe({
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
    this.loadPSI();
  }

  clickedRows(id: number) {
    this.router.navigate(['/psi/view/' + id]);
    // console.log(id);
  }
}
