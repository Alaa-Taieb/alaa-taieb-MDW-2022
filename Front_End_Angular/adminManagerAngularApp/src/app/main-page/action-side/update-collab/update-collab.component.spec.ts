import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollabComponent } from './update-collab.component';

describe('UpdateCollabComponent', () => {
  let component: UpdateCollabComponent;
  let fixture: ComponentFixture<UpdateCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCollabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
