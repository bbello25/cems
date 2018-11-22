import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../../_models/user';
import { AdminService } from '../../_services/admin.service';
import { error } from '@angular/compiler/src/util';
import { detectChanges } from '@angular/core/src/render3';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';
import { Role } from '../../_models/Role';
import { forEach } from '@angular/router/src/utils/collection';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { filter } from 'rxjs/operators';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  availableRoles: Role[];
  bsModalRef: BsModalRef;

  constructor(
    private adminService: AdminService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: BsModalService,
    private alertify: AlertifyService
  ) {
  }

  ngOnInit() {
    this.getUsersWithRoles();
    this.getAvailableRoles();
  }

  deleteUser(username: string) {
    this.showConfirmationModal(username);
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(
      (users: User[]) => {
        this.users = users;
        this.changeDetectorRef.detectChanges();
      },
      err => {
        this.alertify.error(err);
      }
    );
  }

  private getAvailableRoles() {
    this.adminService.getRoles().subscribe(
      (roles: Role[]) => {
        this.availableRoles = roles;
      }
    );
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {
      initialState
    });
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roleNames: values.filter(el => el.checked === true).map(el => el.name)
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(
          () => {
            this.getUsersWithRoles();
            this.changeDetectorRef.detectChanges();
            this.alertify.success('Roles updated successfully');
          },
          err => {
            this.alertify.error(err);
          }
        );
      }
    });
  }

  private getRolesArray(user) {
    const roles: Role[] = [];
    const userRoles = user.roles;


    for (let i = 0; i < this.availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if (this.availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          this.availableRoles[i].checked = true;
          roles.push(this.availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        this.availableRoles[i].checked = false;
        roles.push(this.availableRoles[i]);
      }
    }
    return roles;
  }

  public showConfirmationModal(username: string): void {
    const modal = this.modalService.show(ConfirmModalComponent);
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      'Delete user confirmation',
      `Are you sure you want delete user "${username}"?`
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.adminService.deleteUser(username).subscribe(
          response => {
            this.users = this.users.filter(u => u.username !== username);
            this.changeDetectorRef.detectChanges();
            this.alertify.success('User removed successfully');
          },
          err => {
            this.alertify.error(err);
          }
        );
      } else if (result === false) {
        // when pressed No
      } else {
        // When closing the modal without no or yes
      }
    });
  }

}
