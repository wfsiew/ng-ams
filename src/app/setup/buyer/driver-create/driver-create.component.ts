import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { DriverService } from 'src/app/setup/buyer/services/driver.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-driver-create',
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.css']
})
export class DriverCreateComponent extends GeneralForm implements OnInit {

  isLoading = false;
  buyer_id: string;
  id: string;
  data: any = { id: '' };
  file: File;
  imgURL: any;
  imgId = 0;
  isEdit = false;
  @ViewChild('uploader', { static: false }) uploader: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private driverService: DriverService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.buyer_id = params.get('buyer_id');
      if (!_.isNull(this.id)) {
        this.isEdit = true;
      }

      this.load();
    });
  }

  createForm() {
    this.mform = this.fb.group({
      name: ['', [Validators.required]],
      id_num: ['', [Validators.required]]
    });
  }

  setForm() {
    const o = this.data;
    this.mform.patchValue({
      name: o.name,
      id_num: o.id_num
    });
  }

  setLicense() {
    const o = this.data;
    if (o.license) {
      this.imgId = o.license.id;
      this.imgURL = o.license.img;
    }
  }

  load() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      return;
    }

    this.isLoading = true;
    this.driverService.edit(this.buyer_id, this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
      this.setLicense();
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
    this.router.navigate([`/ams/setup/buyer/driver/${this.buyer_id}/list`]);
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }

    // if (!this.file && !this.isEdit) {
    //   this.toastr.error('Please upload driving license');
    //   return;
    // }

    // else if (!this.file && this.imgId === 0 && this.isEdit) {
    //   this.toastr.error('Please upload driving license');
    //   return;
    // }
    
    const f = this.mform.value;
    const formData = new FormData();
    if (this.file) {
      formData.append('file', this.file);
    }

    formData.append('name', f.name);
    formData.append('id_num', f.id_num);
    formData.append('buyer_id', this.buyer_id);
    if (!this.isEdit) {
      this.driverService.create(this.buyer_id, formData).subscribe((res: any) => {
        this.toastr.success('New Driver successfully created');
        this.mform.reset();
        this.onRemoveFile(this.uploader.nativeElement);
        // this.router.navigate([`/ams/setup/country/edit/${res.id}`]);
      });
    }

    else {
      this.driverService.update(this.buyer_id, this.data.id, formData).subscribe((res: any) => {
        this.toastr.success('Driver successfully updated');
      });
    }
  }
}
