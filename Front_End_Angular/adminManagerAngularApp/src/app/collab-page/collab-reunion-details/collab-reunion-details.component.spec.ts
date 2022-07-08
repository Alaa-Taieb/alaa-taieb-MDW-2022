import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabReunionDetailsComponent } from './collab-reunion-details.component';

describe('CollabReunionDetailsComponent', () => {
  let component: CollabReunionDetailsComponent;
  let fixture: ComponentFixture<CollabReunionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabReunionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabReunionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
