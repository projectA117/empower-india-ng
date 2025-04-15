import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryImageUploadComponent } from './gallery-image-upload.component';

describe('GalleryImageUploadComponent', () => {
  let component: GalleryImageUploadComponent;
  let fixture: ComponentFixture<GalleryImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryImageUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
