import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDayPage } from './modify-day.page';

describe('ModifyDayPage', () => {
  let component: ModifyDayPage;
  let fixture: ComponentFixture<ModifyDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyDayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
