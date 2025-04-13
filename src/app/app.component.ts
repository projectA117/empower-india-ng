import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderService } from '@service/loader.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';
import { ProjectListComponent } from './project-list/project-list.component';
import { CommonService } from '@service/common.service';

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
  private commonService = inject(CommonService);

  title = 'empower';
  items: MenuItem[] | undefined;
  loading: boolean = false;
  loading$: Observable<boolean>;
  isLoading = computed(() => this.loaderService.loading());
  isSigninOrRegister = false;
  isLoggedIn = computed(() => this.commonService.user() !== null);

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    effect(() => {
      const userRole =
        this.commonService.user()?.roles?.map((role: any) => role.id) ?? [];
      this.items = [
        {
          label: 'HOME',
          routerLink: 'home',
          command: () => this.removeFilters(),
        },
        {
          label: 'ABOUT US',
          routerLink: 'about-us',
          command: () => this.removeFilters(),
        },
        // {
        //   label: 'VISION',
        //   routerLink: 'vision',
        // },
        {
          label: 'PROJECTS',
          routerLink: 'projects',
        },
        {
          label: 'SPONSORS',
          routerLink: 'sponsors',
          command: () => this.removeFilters(),
        },
        {
          label: 'GALLERY',
          routerLink: 'gallery',
          command: () => this.removeFilters(),
        },
        {
          label: 'Contact',
          routerLink: 'contact',
          command: () => this.removeFilters(),
        },
        {
          label: 'villages',
          routerLink: 'villages',
          command: () => this.removeFilters(),
        },
        {
          label: 'map',
          routerLink: 'map'
        },
        {
          label: 'users',
          routerLink: 'users',
          visible: userRole.some((role) => [3].includes(role)),
          command: () => this.removeFilters(),
        },
      ];
    });
  }

  removeFilters() {
    this.commonService.selectedProjectFilters = {
      category: '',
      district: {},
      mandal: {},
      vilage: {},
      status: '',
    };
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('signin') || event.url.includes('register')) {
          this.isSigninOrRegister = true;
        } else {
          this.isSigninOrRegister = false;
        }
      }
    });
  }

  logout() {
    this.commonService.onLogout();
    this.router.navigate(['/home']);
  }
}
