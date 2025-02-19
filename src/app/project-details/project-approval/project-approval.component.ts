import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-approval',
  standalone: true,
  imports: [FormsModule, InputTextModule],
  templateUrl: './project-approval.component.html',
  styleUrl: './project-approval.component.scss',
})
export class ProjectApprovalComponent {
  value: string | undefined;
}
