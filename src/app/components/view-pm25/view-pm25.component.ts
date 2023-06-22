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

  options: google.maps.MapOptions = {
    zoom: 11,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };
  center = { lat: 1.3521, lng: 103.8198 };
  marker = {
    position: { lat: 1.3521, lng: 103.8198 },
  };

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
        this.marker.position.lat = Number(this.pm25.latitude);
        this.marker.position.lng = Number(this.pm25.longitude);
        console.log(this.pm25);
      },
      error: (err) => console.error(err),
    });
  }
}
