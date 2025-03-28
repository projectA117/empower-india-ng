import { map } from 'rxjs';
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  Signal,
  inject,
  effect,
} from '@angular/core';

@Directive({
  selector: '[appHasRole]',
  standalone: true, // Angular 17 standalone directive
})
export class RoleDirective {
  private userRoles: any;

  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);

  constructor() {
    this.userRoles =
      JSON.parse(localStorage.getItem('user'))?.roles?.map(
        (role: any) => role.id
      ) ?? [];
  }

  @Input({ required: true }) set appHasRole(requiredRoles: string[]) {
    // effect(() => {
    const userRoles = this.userRoles;
    if (userRoles.some((role) => requiredRoles.includes(role))) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
    //});
  }
}
