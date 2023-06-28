import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/services/level.service';
import { LevelModel } from 'src/app/models/level.model';
import { BuildingModel } from 'src/app/models/building.model';
import { BuildingService } from 'src/app/services/building.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  levels: LevelModel[];
  buildings: BuildingModel[];

  constructor(
    private levelService: LevelService,
    private buildingService: BuildingService
  ) {}

  ngOnInit(): void {
    this.loadBuilding();
    this.loadLevel();
  }

  loadBuilding() {
    this.buildingService.getAllBuilding().subscribe({
      next: (response) => {
        this.buildings = response;
        // console.log(this.levels);
      },
      error: (err) => console.error(err),
    });
  }

  loadLevel() {
    this.levelService.getAllLevel().subscribe({
      next: (response) => {
        this.levels = response;
        // console.log(this.levels);
      },
      error: (err) => console.error(err),
    });
  }
}
