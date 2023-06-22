import { Component, OnInit } from '@angular/core';
import { PSIService } from 'src/app/services/psi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-psi',
  templateUrl: './view-psi.component.html',
  styleUrls: ['./view-psi.component.scss'],
})
export class ViewPsiComponent implements OnInit {
  psi: any;
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
    private psiService: PSIService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadATemp();
  }

  loadATemp() {
    const id = this.route.snapshot.params['id'];
    this.psiService.getAPSI(id).subscribe({
      next: (response) => {
        this.psi = response;
        this.marker.position.lat = Number(this.psi.latitude);
        this.marker.position.lng = Number(this.psi.longitude);
        console.log(this.psi);
      },
      error: (err) => console.error(err),
    });
  }
}
