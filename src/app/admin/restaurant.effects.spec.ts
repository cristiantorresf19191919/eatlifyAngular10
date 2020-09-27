import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RestaurantEffects } from './restaurant.effects';

describe('RestaurantEffects', () => {
  let actions$: Observable<any>;
  let effects: RestaurantEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RestaurantEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RestaurantEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
