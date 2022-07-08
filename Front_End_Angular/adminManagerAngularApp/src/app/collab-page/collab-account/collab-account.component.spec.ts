import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabAccountComponent } from './collab-account.component';

describe('CollabAccountComponent', () => {
  let component: CollabAccountComponent;
  let fixture: ComponentFixture<CollabAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
