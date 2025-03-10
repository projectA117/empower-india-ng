import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VisionComponent } from './vision/vision.component';
import { VendordsComponent } from './vendords/vendords.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectSponsorsComponent } from './project-sponsors/project-sponsors.component';
import { SponsorsDetailsComponent } from './sponsors-details/sponsors-details.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about-us', component: AboutComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'vendors', component: VendordsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'sponsors', component: SponsorsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'project-details', component: ProjectDetailsComponent },
  { path: 'project-sponsors', component: ProjectSponsorsComponent },
  { path: 'sponsors-details', component: SponsorsDetailsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
];
