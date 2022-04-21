import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollabComponent } from './add-collab.component';

describe('AddCollabComponent', () => {
  let component: AddCollabComponent;
  let fixture: ComponentFixture<AddCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
