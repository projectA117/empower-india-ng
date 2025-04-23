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
  selector: '[adminAccess]',
  standalone: true, // Angular 17 standalone directive
})
export class AdminAccessDirective {
  private userRoles: any;
  private districtID: any;

  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);

  constructor() {
    this.userRoles =
      JSON.parse(localStorage.getItem('user'))?.roles?.map(
        (role: any) => role.id
      ) ?? [];

    this.districtID =
      JSON.parse(localStorage.getItem('user'))?.districtId ?? null;
  }

  @Input({ required: true }) set adminAccess(requiredistrict: string) {
    // effect(() => {
    const userRoles = this.userRoles;
    const district = this.districtID;
    if (district == requiredistrict) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
    //});
  }
}
