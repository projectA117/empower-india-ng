import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'empower';
  items: MenuItem[] | undefined;


  ngOnInit() {
      this.items = [
          {
              label: 'HOME',
              routerLink: 'home'
          },
          {
              label: 'ABOUT US',
              routerLink: 'about-us'
          },
          {
              label: 'VISION',
              routerLink: 'vision'
          },
          {
              label: 'PROJECTS',
              routerLink: 'projects'
          },
          {
              label: 'SPONSORS',
              routerLink: 'sponsors'
          },
          {
              label: 'VENDORS',
              routerLink: 'vendors'
          }
      ]
  }
}
