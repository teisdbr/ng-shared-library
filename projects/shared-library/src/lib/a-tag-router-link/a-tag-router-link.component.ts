import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shr-a-tag-router-link',
  templateUrl: './a-tag-router-link.component.html',
  styleUrls: ['./a-tag-router-link.component.scss']
})
export class ATagRouterLinkComponent {
  @Input() routerLink: string|any[];
  @Input() class?: string;
   @Input() icon?: string;
   @Input() text?: string;
}
