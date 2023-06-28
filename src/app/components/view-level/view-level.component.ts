import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoordService } from 'src/app/services/coord.service';
import { CoordModel } from 'src/app/models/coordinates.model';
import { LevelService } from 'src/app/services/level.service';
import { ImageMapCoordinate } from '../image-map/image-map.component';

@Component({
  selector: 'app-view-level',
  templateUrl: './view-level.component.html',
  styleUrls: ['./view-level.component.scss'],
})
export class ViewLevelComponent implements OnInit {
  coords: CoordModel[];
  level: any;
  // building: BuildingModel;
  level_id: any;

  selectedCoord: ImageMapCoordinate | null = null;
  coordinates: ImageMapCoordinate[];

  constructor(
    private coordService: CoordService,
    private levelService: LevelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.loadCoord();
    this.route.paramMap.subscribe((params) => {
      this.level_id = params.get('id');
      // console.log(this.level_id);
      this.loadLevel();

      this.selectedCoord = null;
    });
  }

  loadLevel() {
    this.levelService.getALevel(this.level_id).subscribe({
      next: (response) => {
        this.level = response;
        // console.log(this.level.building_id);
        // this.loadBuilding(this.level.building_id);
        // console.log(this.level);
        this.loadCoord();
      },
      error: (err) => console.error(err),
    });
  }

  loadCoord() {
    this.coordService.getAllCoordFromLevel(this.level_id).subscribe({
      next: (response) => {
        this.coords = response;
        // console.log(this.coords);
      },
      error: (err) => console.error(err),
    });
  }

  getClick(coordinate: any) {
    this.selectedCoord = coordinate;
    // console.log(coordinate);
    // console.log(this.selectedCoord);
  }
}
