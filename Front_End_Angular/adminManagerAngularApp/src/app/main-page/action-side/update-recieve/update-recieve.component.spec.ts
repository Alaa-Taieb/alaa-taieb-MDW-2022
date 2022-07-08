import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecieveComponent } from './update-recieve.component';

describe('UpdateRecieveComponent', () => {
  let component: UpdateRecieveComponent;
  let fixture: ComponentFixture<UpdateRecieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRecieveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
