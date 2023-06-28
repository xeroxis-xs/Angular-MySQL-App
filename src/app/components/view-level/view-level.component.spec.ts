import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLevelComponent } from './view-level.component';

describe('ViewLevelComponent', () => {
  let component: ViewLevelComponent;
  let fixture: ComponentFixture<ViewLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLevelComponent]
    });
    fixture = TestBed.createComponent(ViewLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
