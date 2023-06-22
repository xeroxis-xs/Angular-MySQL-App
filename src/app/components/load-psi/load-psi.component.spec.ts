import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPsiComponent } from './load-psi.component';

describe('LoadPsiComponent', () => {
  let component: LoadPsiComponent;
  let fixture: ComponentFixture<LoadPsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
