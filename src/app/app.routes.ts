import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VisionComponent } from './vision/vision.component';
import { VendordsComponent } from './vendords/vendords.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about-us', component: AboutComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'vendors', component: VendordsComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'sponsors', component: SponsorsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'project-details', component: ProjectDetailsComponent },
];
