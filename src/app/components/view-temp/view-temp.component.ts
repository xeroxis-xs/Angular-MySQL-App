import { Component, OnInit } from '@angular/core';
import { TempService } from 'src/app/services/temp.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-temp',
  templateUrl: './view-temp.component.html',
  styleUrls: ['./view-temp.component.scss'],
})
export class ViewTempComponent implements OnInit {
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

  temp: any;

  constructor(
    private tempService: TempService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadATemp();
  }

  loadATemp() {
    const id = this.route.snapshot.params['id'];
    this.tempService.getATemp(id).subscribe({
      next: (response) => {
        this.temp = response;
        this.marker.position.lat = Number(this.temp.latitude);
        this.marker.position.lng = Number(this.temp.longitude);
      },
      error: (err) => console.error(err),
    });
  }
}
