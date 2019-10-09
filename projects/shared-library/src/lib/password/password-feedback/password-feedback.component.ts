import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vf-password-feedback',
  templateUrl: './password-feedback.component.html',
  styleUrls: ['./password-feedback.component.scss']
})
export class PasswordFeedbackComponent implements OnInit {

  @Input() feedback = { warning: null, suggestions: [] };

  constructor() {}

  ngOnInit() {}

}
