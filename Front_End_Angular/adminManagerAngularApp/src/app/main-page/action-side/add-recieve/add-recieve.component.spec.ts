import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecieveComponent } from './add-recieve.component';

describe('AddRecieveComponent', () => {
  let component: AddRecieveComponent;
  let fixture: ComponentFixture<AddRecieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecieveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
