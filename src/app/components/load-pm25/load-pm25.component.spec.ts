import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPm25Component } from './load-pm25.component';

describe('LoadPm25Component', () => {
  let component: LoadPm25Component;
  let fixture: ComponentFixture<LoadPm25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPm25Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPm25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
