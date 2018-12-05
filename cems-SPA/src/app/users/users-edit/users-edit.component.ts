import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../../_services/alertify.service';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  editMode = false;
  userForm: FormGroup;
  submitted = false;

  user: User;
  hostToAdd: any = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.userForm = this.initUserForm();
    });
  }

  initUserForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      username: [{ value: this.user.username, disabled: false }],
      phoneNumber: this.user.phone,
      email: this.user.email
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  updateUser({ value, valid }: { value: User, valid: boolean }) {
    if (!valid) {
      this.alertify.warning('Form is invalid');
      return false;
    }
    this.user.username = value.username;
    this.user.firstName = value.firstName;
    this.user.lastName = value.lastName;
    this.user.email = value.email;
    this.user.phone = value.phone;
    this.userService.update(this.user).subscribe(result => {
        this.alertify.success('Successfully updated');
        this.toggleEditMode();
        this.cdr.detectChanges();
      },
      error1 => this.alertify.error(error1));
    return true;
  }

  AddHost() {
    const trustedHostsObj = {
      trustedHost: [this.hostToAdd.host]
    };
    console.log(trustedHostsObj);
    this.userService
      .updateTrustedHosts(this.user.id, trustedHostsObj)
      .subscribe(response => {
        this.user.webApiKey.trustedHosts = [
          ...this.user.webApiKey.trustedHosts,
          this.hostToAdd
        ];
      });
  }
}
