import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '@service/common.service';
import { ButtonModule } from 'primeng/button';
import { ImportsModule } from '../imports';
import { RoleDirective } from 'src/directives/role-access.directive';

@Component({
  selector: 'app-gallery-image-upload',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
    RoleDirective,
  ],
  templateUrl: './gallery-image-upload.component.html',
  styleUrl: './gallery-image-upload.component.scss'
})
export class GalleryImageUploadComponent {
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  imageUploadForm: FormGroup = new FormGroup({});
  FileUpload: any;
  uploadimage: any;
  imageUploadSidebarVisible: boolean = false;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.createImageUploadForm();
  }

  createImageUploadForm() {
    this.imageUploadForm = new FormGroup({
      eventType: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  updateImageUploadForm() {
    const payload = {
      eventType: this.imageUploadForm.get('eventType')?.value,
      description: this.imageUploadForm.get('description')?.value,
    };

    const formData = new FormData();
    formData.append('file', this.uploadimage); // Add the file
    // formData.append('user', this.testpayload);
    // formData.append(
    //   'payload',
    //   new Blob([JSON.stringify(payload)], { type: 'application/json' })
    // );
    formData.append('eventType', this.imageUploadForm.get('eventType')?.value);
    formData.append('description', this.imageUploadForm.get('description')?.value);

    this.commonService.addNewImages(formData).subscribe({
      next: (data) => {
        console.log(data, 'UPLOADED DATA');
        this.closeDialogEvent.emit(true); // 👈 Emit event to parent to close sidebar
      },
      error: (error) => {
        console.error('Upload failed', error);
      }
    });
  }

  onUpload(event: any) {
    // const file = event.files;
    // console.log('...File', file);
    const file = event.target?.files[0]; // Get the selected file
    const formData = new FormData();
    formData.append('file', file);
    this.uploadimage = file;
    this.FileUpload = formData;
  }

  onClose() {
    this.imageUploadForm.reset();
    this.closeDialogEvent.emit(true);
  }
}
