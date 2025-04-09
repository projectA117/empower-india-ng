import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '@service/productservice';
import { ProjectDetailsService } from '@service/project-details.service';
import { ImportsModule } from 'src/app/imports';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleDirective } from 'src/directives/role-access.directive';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-project-work-in-progress',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    ImportsModule,
    FormsModule,
    ReactiveFormsModule,
    RoleDirective,
  ],
  templateUrl: './project-work-in-progress.component.html',
  styleUrl: './project-work-in-progress.component.scss',
  providers: [ProjectDetailsService, ProductService],
})
export class ProjectWorkInProgressComponent implements OnInit {
  @Input() projectData: any;
  WIPDetails: any;
  WIPSidebarVisible: boolean = false;
  WIPForm: FormGroup = new FormGroup({});
  editWIP: boolean = false;
  isLoading: boolean = false;
  imagePreviews: string[] = [];
  selectedFiles: (File | { base64: string; fromServer: true })[] = [];

  constructor(
    private productService: ProductService,
    private projectDetailsService: ProjectDetailsService
  ) {}

  ngOnInit() {
    this.showWIPDetails();
    this.createWIPFormForm();
  }

  createWIPFormForm() {
    this.WIPForm = new FormGroup({
      id: new FormControl(0),
      WIPDate: new FormControl('', [Validators.required]),
      WIPDescription: new FormControl('', [Validators.required]),
      WIPAuditor: new FormControl('', [Validators.required]),
      WIPPublishToGallery: new FormControl(''),
      // WIPPhotosVideos: new FormControl('', [Validators.required]),
    });
  }

  showWIPDetails() {
    this.projectDetailsService.showWIP(this.projectData.id).subscribe((res) => {
      this.WIPDetails = res;
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.imagePreviews = [];
    this.selectedFiles = Array.from(input.files);

    this.selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      if (file instanceof File) {
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  updateWIPForm() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    const payload = {
      status: this.WIPForm.get('WIPDescription').value,
      createdBy: this.WIPForm.get('WIPAuditor').value,
      createdDate: this.WIPForm.get('WIPDate').value,
      PublishToGallery: this.WIPForm.get('WIPPublishToGallery').value
        ? true
        : false,
      projectId: this.projectData.id,
      id: this.WIPForm.get('id').value,
    };

    const formData = new FormData();
    formData.append(
      'projectStatus',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
    formData.append('images', new Blob(this.selectedFiles as BlobPart[]));
    if (this.editWIP) {
      this.projectDetailsService.updateWIP(formData).subscribe((res) => {
        this.showWIPDetails();
        this.onClear();
      });
    } else {
      this.projectDetailsService.createWIP(formData).subscribe((res) => {
        this.showWIPDetails();
        this.onClear();
      });
    }
  }

  onEditWIP(wip: any) {
    this.onClear();
    this.WIPSidebarVisible = true;
    this.editWIP = true;
    this.WIPForm.patchValue({
      id: wip.id,
      WIPDate: new Date(wip.createdDate),
      WIPAuditor: wip.createdBy,
      WIPDescription: wip.status,
      WIPPublishToGallery: wip.PublishToGallery,
    });
    if (wip.statusImage) {
      this.imagePreviews.push(`data:image/jpeg;base64,${wip.statusImage}`);
      this.selectedFiles = this.imagePreviews.map((b64) => ({
        base64: b64,
        fromServer: true,
      }));
    }
  }

  onDelete(id) {
    this.projectDetailsService.deleteWIP(id).subscribe((res) => {
      this.showWIPDetails();
    });
  }

  onClear() {
    this.WIPForm.reset();
    this.isLoading = false;
    this.editWIP = false;
    this.selectedFiles = [];
    this.imagePreviews = [];
    this.WIPSidebarVisible = false;
  }
}
