import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadHumidComponent } from './load-humid.component';

describe('LoadHumidComponent', () => {
  let component: LoadHumidComponent;
  let fixture: ComponentFixture<LoadHumidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadHumidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadHumidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
