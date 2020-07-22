import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { UserService } from 'src/app/setup/user/services/user.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent extends GeneralForm implements OnInit {

  id: string;
  data: any = { id: '' };
  isEdit = false;
  lockGroup = false;
  groupList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lookupService: LookupService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
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
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      email: ['', [Validators.email]],
      first_name: [''],
      last_name: [''],
      group_id: [null, [Validators.required]]
    });
  }

  setForm() {
    const o = this.data;
    this.lockGroup = o.assigned;
    const groups: any[] = o.groups;
    let group_id = 0;
    if (!Helper.isEmpty(groups)) {
      group_id = groups[0].id;
    }

    this.mform.patchValue({
      username: o.username,
      password: '********',
      email: o.email,
      first_name: o.first_name,
      last_name: o.last_name,
      group_id: group_id
    });
  }

  load() {
    this.lookupService.listGroup().subscribe((res: any) => {
      this.groupList = res;
      this.loadDetails();
    });
  }

  loadDetails() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      return;
    }

    this.userService.edit(this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
    });
  }

  onBack() {
    this.router.navigate(['/ams/setup/user/list']);
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }
    
    const f = this.mform.value;
    const o = {
      username: f.username,
      password: f.password,
      email: f.email,
      first_name: f.first_name,
      last_name: f.last_name
    }
    if (!this.lockGroup) {
      o['group_id'] = f.group_id;
    }

    if (!this.isEdit) {
      this.userService.create(o).subscribe((res: any) => {
        this.toastr.success('New User successfully created');
        this.mform.reset();
        // this.router.navigate([`/ams/setup/state/edit/${res.id}`]);
      });
    }

    else {
      this.userService.update(this.data.id, o).subscribe((res: any) => {
        this.toastr.success('User successfully updated');
      });
    }
  }

  get group() {
    const groups: any[] = this.data.groups;
    let group_id = 0;
    let s = '';
    if (!Helper.isEmpty(groups)) {
      s = groups[0].name;
    }

    return s;
  }
}
