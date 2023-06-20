import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTempComponent } from './view-temp.component';

describe('ViewTempComponent', () => {
  let component: ViewTempComponent;
  let fixture: ComponentFixture<ViewTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
