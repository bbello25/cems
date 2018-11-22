import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../_models/Role';
import { Observable } from 'rxjs';
import { AdminService } from '../../_services/admin.service';
import { filter, map, scan } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css']
})
export class RolesManagementComponent implements OnInit {
  roles$: Observable<Role[]>;
  roleToAdd = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef, private modalService: BsModalService) {
  }

   canDeleteRole(name): boolean {
    const _name = name.toLowerCase();
    return (_name === 'admin' || _name === 'user');
  }

  ngOnInit() {
    this.roles$ = this.adminService.getRoles();
  }

  deleteRole(id: number, roleName: string) {
    this.showConfirmationModal(id, roleName);
  }


  addRole() {
    this.adminService.addRole(this.roleToAdd).subscribe(result => {
      console.log('Role added successfully');
      const role = new Role(this.roleToAdd);
      this.roleToAdd = '';
      const newRoles = this.roles$.pipe(scan(acc => acc.concat(role)));
      this.roles$ = null;
      this.roles$ = newRoles;
      this.roles$.subscribe(value => console.log(value));
      this.cdr.detectChanges();
    }, error1 => console.log('Role added unsuccessfully'));
  }

  cancel() {
    console.log('canceled');
    this.roleToAdd = '';
    this.cdr.detectChanges();
  }

  public showConfirmationModal(id: number, roleName: string): void {
    const modal = this.modalService.show(ConfirmModalComponent);
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      'Delete role confirmation',
      `Are you sure you want delete ${roleName} role?`
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.adminService.deleteRole(id).subscribe(res => {
            this.roles$ = this.roles$.pipe(filter((roles, index) => roles[index].id !== id));
            this.cdr.detectChanges();
          },
          error1 => console.log('Role delete failed'));
      } else if (result === false) {
        // when pressed No
      } else {
        // When closing the modal without no or yes
      }
    });
  }

}
