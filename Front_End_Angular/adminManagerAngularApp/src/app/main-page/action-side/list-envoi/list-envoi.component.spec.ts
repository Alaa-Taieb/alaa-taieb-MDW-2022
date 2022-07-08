import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnvoiComponent } from './list-envoi.component';

describe('ListEnvoiComponent', () => {
  let component: ListEnvoiComponent;
  let fixture: ComponentFixture<ListEnvoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnvoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
