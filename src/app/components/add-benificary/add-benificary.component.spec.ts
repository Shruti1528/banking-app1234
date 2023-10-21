import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenificaryComponent } from './add-benificary.component';

describe('AddBenificaryComponent', () => {
  let component: AddBenificaryComponent;
  let fixture: ComponentFixture<AddBenificaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBenificaryComponent]
    });
    fixture = TestBed.createComponent(AddBenificaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
