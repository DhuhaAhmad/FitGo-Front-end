import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayWorkoutComponent } from './play-workout.component';

describe('PlayWorkoutComponent', () => {
  let component: PlayWorkoutComponent;
  let fixture: ComponentFixture<PlayWorkoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayWorkoutComponent]
    });
    fixture = TestBed.createComponent(PlayWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
