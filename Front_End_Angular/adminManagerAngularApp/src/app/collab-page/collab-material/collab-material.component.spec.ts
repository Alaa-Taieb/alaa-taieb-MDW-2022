import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabMaterialComponent } from './collab-material.component';

describe('CollabMaterialComponent', () => {
  let component: CollabMaterialComponent;
  let fixture: ComponentFixture<CollabMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
