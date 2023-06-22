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
        console.log(this.psi);
      },
      error: (err) => console.error(err),
    });
  }
}
