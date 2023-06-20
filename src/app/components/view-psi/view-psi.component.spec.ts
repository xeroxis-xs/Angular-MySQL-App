import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPsiComponent } from './view-psi.component';

describe('ViewPsiComponent', () => {
  let component: ViewPsiComponent;
  let fixture: ComponentFixture<ViewPsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
