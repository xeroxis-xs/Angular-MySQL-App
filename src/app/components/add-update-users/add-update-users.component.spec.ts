import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateUsersComponent } from './add-update-users.component';

describe('AddUpdateUsersComponent', () => {
  let component: AddUpdateUsersComponent;
  let fixture: ComponentFixture<AddUpdateUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
