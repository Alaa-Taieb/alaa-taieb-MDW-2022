import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabDemandeComponent } from './collab-demande.component';

describe('CollabDemandeComponent', () => {
  let component: CollabDemandeComponent;
  let fixture: ComponentFixture<CollabDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
