import { Component, OnInit } from '@angular/core';
import { HumidService } from 'src/app/services/humid.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-humid',
  templateUrl: './view-humid.component.html',
  styleUrls: ['./view-humid.component.scss'],
})
export class ViewHumidComponent implements OnInit {
  humid: any;

  constructor(
    private humidService: HumidService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAHumid();
  }

  loadAHumid() {
    const id = this.route.snapshot.params['id'];
    this.humidService.getAHumid(id).subscribe({
      next: (response) => {
        this.humid = response;
        console.log(this.humid);
      },
      error: (err) => console.error(err),
    });
  }
}
