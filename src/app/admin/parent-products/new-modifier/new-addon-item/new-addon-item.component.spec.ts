import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddonItemComponent } from './new-addon-item.component';

describe('NewAddonItemComponent', () => {
  let component: NewAddonItemComponent;
  let fixture: ComponentFixture<NewAddonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAddonItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
