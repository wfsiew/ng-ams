import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { TruckService } from 'src/app/setup/buyer/services/truck.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-truck-create',
  templateUrl: './truck-create.component.html',
  styleUrls: ['./truck-create.component.css']
})
export class TruckCreateComponent extends GeneralForm implements OnInit {

  isLoading = false;
  buyer_id?: number;
  id: string;
  data: any = { id: '' };
  file: File;
  imgURL: any;
  imgId = 0;
  isEdit = false;
  @ViewChild('uploader', { static: true }) uploader: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private truckService: TruckService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    const user = this.authService.loadUser();
    this.buyer_id = user.buyer_id;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!_.isNull(this.id)) {
        this.isEdit = true;
      }

      this.load();
    });
  }

  createForm() {
    this.mform = this.fb.group({
      registration_num: ['', [Validators.required]]
    });
  }

  setForm() {
    const o = this.data;
    this.mform.patchValue({
      registration_num: o.registration_num
    });
  }

  setImage() {
    const o = this.data;
    if (o.img) {
      this.imgId = o.img.id;
      this.imgURL = o.img.img;
    }
  }

  load() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      return;
    }

    this.isLoading = true;
    this.truckService.edit(this.buyer_id, this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
      this.setImage();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  uploadFile(files) {
    if (files.length === 0) {
      return;
    }

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastr.error('Only images are supported');
      return;
    }
 
    this.file = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (event) => { 
      this.imgURL = reader.result;
    }
  }

  onRemoveFile(uploader) {
    this.imgURL = null;
    this.file = null;
    uploader.value = '';
  }

  onBack() {
    this.router.navigate([`/ams/buyer/truck/list`]);
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }

    if (!this.file && !this.isEdit) {
      this.toastr.error('Please upload truck photo');
      return;
    }

    else if (!this.file && this.imgId === 0 && this.isEdit) {
      this.toastr.error('Please upload truck photo');
      return;
    }
    
    const f = this.mform.value;
    const formData = new FormData();
    if (this.file) {
      formData.append('file', this.file);
    }
    
    formData.append('registration_num', f.registration_num);
    formData.append('buyer_id', `${this.buyer_id}`);
    if (!this.isEdit) {
      this.truckService.create(this.buyer_id, formData).subscribe((res: any) => {
        this.toastr.success('New Truck successfully created');
        this.mform.reset();
        this.imgURL = null;
        this.file = null;
        this.uploader.nativeElement.value = '';
        // this.router.navigate([`/ams/setup/country/edit/${res.id}`]);
      });
    }

    else {
      this.truckService.update(this.buyer_id, this.data.id, formData).subscribe((res: any) => {
        this.toastr.success('Truck successfully updated');
      });
    }
  }
}
