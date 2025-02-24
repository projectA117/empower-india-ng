import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from '@service/loader.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';
import { ProjectListComponent } from './project-list/project-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule,
    ProgressSpinnerModule,
    CommonModule,
    ProjectListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'empower';
  items: MenuItem[] | undefined;
  loading: boolean = false;
  loading$: Observable<boolean>;
  isLoading = computed(() => this.loaderService.loading());
  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.items = [
      {
        label: 'HOME',
        routerLink: 'home',
      },
      {
        label: 'ABOUT US',
        routerLink: 'about-us',
      },
      {
        label: 'VISION',
        routerLink: 'vision',
      },
      {
        label: 'PROJECTS',
        routerLink: 'projects',
      },
      {
        label: 'SPONSORS',
        routerLink: 'sponsors',
      },
      {
        label: 'VENDORS',
        routerLink: 'vendors',
      },
      {
        label: 'Contact',
        routerLink: 'contact',
      },
    ];
  }
}
