import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCollabComponent } from './details-collab.component';

describe('DetailsCollabComponent', () => {
  let component: DetailsCollabComponent;
  let fixture: ComponentFixture<DetailsCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCollabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
