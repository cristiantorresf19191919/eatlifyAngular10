import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModifierComponent } from './new-modifier.component';

describe('NewModifierComponent', () => {
  let component: NewModifierComponent;
  let fixture: ComponentFixture<NewModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
