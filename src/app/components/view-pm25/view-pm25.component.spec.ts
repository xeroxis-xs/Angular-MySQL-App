import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPm25Component } from './view-pm25.component';

describe('ViewPm25Component', () => {
  let component: ViewPm25Component;
  let fixture: ComponentFixture<ViewPm25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPm25Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPm25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
