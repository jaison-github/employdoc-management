import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocExpiryComponent } from './doc-expiry.component';

describe('DocExpiryComponent', () => {
  let component: DocExpiryComponent;
  let fixture: ComponentFixture<DocExpiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocExpiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
