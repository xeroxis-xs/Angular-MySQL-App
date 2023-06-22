import { Component, OnInit } from '@angular/core';
import { TempService } from 'src/app/services/temp.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-temp',
  templateUrl: './view-temp.component.html',
  styleUrls: ['./view-temp.component.scss'],
})
export class ViewTempComponent implements OnInit {
  temp: any;

  constructor(
    private tempService: TempService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadATemp();
  }

  loadATemp() {
    const id = this.route.snapshot.params['id'];
    this.tempService.getATemp(id).subscribe({
      next: (response) => {
        this.temp = response;
        console.log(this.temp);
      },
      error: (err) => console.error(err),
    });
  }
}
