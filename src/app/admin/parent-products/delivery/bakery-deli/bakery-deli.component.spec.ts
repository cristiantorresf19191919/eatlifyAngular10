import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BakeryDeliComponent } from './bakery-deli.component';

describe('BakeryDeliComponent', () => {
  let component: BakeryDeliComponent;
  let fixture: ComponentFixture<BakeryDeliComponent>;

  beforeEach(waitForAsync(() => {
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
