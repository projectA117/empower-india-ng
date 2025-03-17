import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordsComponent } from './vendords.component';

describe('VendordsComponent', () => {
  let component: VendordsComponent;
  let fixture: ComponentFixture<VendordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
