import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitCreatePage } from './habit-create.page';

describe('HabitCreatePage', () => {
  let component: HabitCreatePage;
  let fixture: ComponentFixture<HabitCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
