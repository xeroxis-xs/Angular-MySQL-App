import { Component, OnInit } from '@angular/core';
import { PM25Service } from 'src/app/services/pm25.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-pm25',
  templateUrl: './view-pm25.component.html',
  styleUrls: ['./view-pm25.component.scss'],
})
export class ViewPm25Component implements OnInit {
  pm25: any;

  constructor(
    private pm25Service: PM25Service,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadATemp();
  }

  loadATemp() {
    const id = this.route.snapshot.params['id'];
    this.pm25Service.getAPM25(id).subscribe({
      next: (response) => {
        this.pm25 = response;
        console.log(this.pm25);
      },
      error: (err) => console.error(err),
    });
  }
}
