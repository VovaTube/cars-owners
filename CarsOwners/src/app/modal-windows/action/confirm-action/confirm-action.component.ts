import { Component, OnInit, EventEmitter, Output, Input, HostListener, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss']
})
export class ConfirmActionComponent implements OnInit {
  @Input() actionName: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  confirm() {
    interval(300).subscribe(() => this.activeModal.close(true));
  }

  cancel() {
    interval(300).subscribe(() => this.activeModal.close(false));
  }
}
