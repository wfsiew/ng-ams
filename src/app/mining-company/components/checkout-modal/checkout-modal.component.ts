import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent extends GeneralForm implements OnInit {

  title: string;
  actual_weight: string;

  public onClose: Subject<any>;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.onClose = new Subject();
    this.mform.patchValue({ actual_weight: this.actual_weight });
  }

  createForm() {
    this.mform = this.fb.group({
      actual_weight: ['', [Validators.required]]
    });
  }

  onYes() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }

    const f = this.mform.value;
    this.onClose.next({ result: true, actual_weight: f.actual_weight });
    this.bsModalRef.hide();
  }

  onHide() {
    this.onClose.next({ result: false });
    this.bsModalRef.hide();
  }
}
