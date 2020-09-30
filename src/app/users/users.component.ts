import { Component, ViewChild, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort} from '@angular/material';
import Swal from 'sweetalert2';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {AddUserComponent} from '../add-user/add-user.component';
import {isObject} from 'util';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  message: any;
  dataToken: any;
  dataUser: any;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    public dialog: MatDialog,
    private _router: Router
  ) {
    this.dataToken = this.authService.dataToken();
    this.dataUser = this.authService.dataUser();
  }

  displayedColumns: string[] = ['name', 'surname', 'email', 'avatar', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    if (this.dataUser == null) {
      this._router.navigate(['login']);
      return false;
    }
    this.userService.getUsers(this.dataToken).subscribe(response => {
      if (response.length === 0) {
        return this.message = 'No hay datos que mostrar!';
      }
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;

    }, error => {
      console.log(error);
    });
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {token: this.dataToken};
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (isObject(data)) {
        Swal.fire(
          'El usuario se registro con éxito!',
          'Preciona el boton ok para continuar!',
          'success');
        this.tableAddItem(data);
      }
    });
  }

  tableAddItem(item) {
    const data = this.dataSource.data;
    data.push(item);
    this.dataSource.data = data;
  }

  openDialog(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {DataUser: data, dataToken: this.dataToken};
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(EditUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(updateUser => {
      if (isObject(updateUser)) {
        Swal.fire(
          'El usuario se actualizo con éxito!',
          'Preciona el boton ok para continuar!',
          'success');
        this.updateRow(updateUser);
      }
    });
  }

  updateRow(updateUserData) {
    const data = this.dataSource.data;

    // @ts-ignore
    const foundIndex = data.findIndex(x => x.id === updateUserData.id);

    data[foundIndex] = updateUserData;

    this.dataSource.data = data;
  }

  delete(data) {
    const params = {id: data};
    Swal.fire({
      title: 'Estas seguro de elminar a este usurio?',
      text: 'El usuario se eliminara permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.dataToken, params).subscribe(response => {
          if (isObject(response)) {
            Swal.fire(
              'El usuario se elimino con éxito',
              'Preciona ok para continuar',
              'success'
            );
            this.removeItemFromTable(data);
          }
        }, error => {
          Swal.fire(
            'Se ha producido un error al tratar de eliminar el usuario!',
            'Preciona ok para continuar!',
            'error'
          );
          console.log(error);
        });
      } else {
        console.log('cancelado');
      }

    });
  }

  removeItemFromTable(idItem) {
    const data = this.dataSource.data;
    const index = data.findIndex(x => {
      // @ts-ignore
      return x.id === idItem;
    });

    if (index > -1) {
      data.splice(index, 1);
    }

    this.dataSource.data = data;
  }

}
