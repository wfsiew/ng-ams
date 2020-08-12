import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  weight: string;
  btnYesText: string;
  @ViewChild('weightInput', { static: true }) weightInput: ElementRef;

  public onClose: Subject<any>;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.onClose = new Subject();
    this.mform.patchValue({ weight: this.weight });
    setTimeout(() => {
      this.weightInput.nativeElement.focus();
    }, 200);
  }

  createForm() {
    this.mform = this.fb.group({
      weight: ['', [Validators.required]]
    });
  }

  onYes() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }

    const f = this.mform.value;
    this.onClose.next({ result: true, weight: f.weight });
    this.bsModalRef.hide();
  }

  onHide() {
    this.onClose.next({ result: false });
    this.bsModalRef.hide();
  }
}
