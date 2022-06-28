import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashpageComponent } from './dashpage.component';

describe('DashpageComponent', () => {
  let component: DashpageComponent;
  let fixture: ComponentFixture<DashpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
