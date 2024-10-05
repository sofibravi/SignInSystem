import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input() route: string;

  constructor(private router: Router) {}

  onRedirect(): void {
    this.router.navigate([`${this.route}`]);
  }
}
