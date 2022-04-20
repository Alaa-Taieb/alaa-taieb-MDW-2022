import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSideComponent } from './action-side.component';

describe('ActionSideComponent', () => {
  let component: ActionSideComponent;
  let fixture: ComponentFixture<ActionSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
