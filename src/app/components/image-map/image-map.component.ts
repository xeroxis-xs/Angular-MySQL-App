import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'image-map',
  templateUrl: './image-map.component.html',
  styleUrls: ['./image-map.component.scss'],
})
export class ImageMapComponent implements OnInit {
  @Input()
  src: string;

  @Input()
  coordinates: ImageMapCoordinate[];

  @Input()
  canEdit: boolean;

  @Output('onClick')
  onClick: EventEmitter<ImageMapCoordinate> = new EventEmitter();

  selectedArea: number | null = null;

  constructor() {}

  ngOnInit() {}

  getCoordinateStyle(coordinate: ImageMapCoordinate): object {
    return {
      top: `${coordinate.y}px`,
      left: `${coordinate.x}px`,
      height: `${coordinate.height}px`,
      width: `${coordinate.width}px`,
    };
  }

  onAreaClick(coordinate: any) {
    this.onClick.emit(coordinate);
  }

  onAreaContext(e: MouseEvent, coordinate: ImageMapCoordinate) {
    if (this.canEdit) {
      if (coordinate) {
        console.log('editing');
      } else {
        console.log('creating');
      }

      e.stopPropagation();
      return false;
    }
    return true;
  }

  onAreaCreate(x: number, y: number): ImageMapCoordinate {
    const coordinate = new ImageMapCoordinate({
      x,
      y,
      width: 100,
      height: 100,
    });
    return coordinate;
  }

  onAreaEdit(coordinate: ImageMapCoordinate): ImageMapCoordinate {
    return coordinate;
  }

  selectArea(index: number) {
    this.selectedArea = index;
  }
}

export class ImageMapCoordinate {
  id: number = 0;
  level_id: number = 0;
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
  name?: string;
  details: string;
  status: string;

  constructor(init?: Partial<ImageMapCoordinate>) {
    Object.assign(this, init);
  }
}
