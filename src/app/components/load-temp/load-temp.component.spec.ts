import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTempComponent } from './load-temp.component';

describe('LoadTempComponent', () => {
  let component: LoadTempComponent;
  let fixture: ComponentFixture<LoadTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
