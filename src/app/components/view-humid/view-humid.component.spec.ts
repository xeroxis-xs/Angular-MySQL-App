import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHumidComponent } from './view-humid.component';

describe('ViewHumidComponent', () => {
  let component: ViewHumidComponent;
  let fixture: ComponentFixture<ViewHumidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHumidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHumidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
