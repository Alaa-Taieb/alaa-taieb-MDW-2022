import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecieveComponent } from './list-recieve.component';

describe('ListRecieveComponent', () => {
  let component: ListRecieveComponent;
  let fixture: ComponentFixture<ListRecieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecieveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
