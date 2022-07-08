import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabReunionComponent } from './collab-reunion.component';

describe('CollabReunionComponent', () => {
  let component: CollabReunionComponent;
  let fixture: ComponentFixture<CollabReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
