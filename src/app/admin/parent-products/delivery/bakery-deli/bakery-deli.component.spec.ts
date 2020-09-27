import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeryDeliComponent } from './bakery-deli.component';

describe('BakeryDeliComponent', () => {
  let component: BakeryDeliComponent;
  let fixture: ComponentFixture<BakeryDeliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BakeryDeliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BakeryDeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
