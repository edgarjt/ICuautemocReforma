import { Component, OnInit, ViewChild} from '@angular/core';
import {CarrerasService} from '../services/carreras.service';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort} from '@angular/material';
import {EditCarreraComponent} from '../edit-carrera/edit-carrera.component';
import {isObject} from "util";
import Swal from "sweetalert2";

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  message: any;

  constructor(
    private carreraService: CarrerasService,
    public dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['car_nombre', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.carreraService.getCarreras().subscribe(response => {
      if (response.length === 0) {
        return this.message = 'No hay datos que mostrar!';
      }
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(EditCarreraComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(updateCarrera => {
      if (isObject(updateCarrera)) {
        Swal.fire(
          'La carrera se actualizo con éxito!',
          'Preciona el boton ok para continuar!',
          'success');
        this.updateRow(updateCarrera);
      }
    });
  }

  updateRow(updateData) {
    const data = this.dataSource.data;

    // @ts-ignore
    const foundIndex = data.findIndex(x => x.car_id === updateData.car_id);

    data[foundIndex] = updateData;

    this.dataSource.data = data;
  }

  delete(data) {
    const params = {car_id: data};
    Swal.fire({
      title: 'Estas seguro de elminar esta carrera?',
      text: 'La carrera se eliminara permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        return this.carreraService.deleteCarrera(params).subscribe(response => {
          if (isObject(response)) {
            Swal.fire(
              'La carrera se elimino con éxito',
              'Preciona ok para continuar',
              'success'
            );
            this.removeItemFromTable(data);
          }
        }, error => {
          Swal.fire(
            'Se ha producido un error en el proceso!',
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
      return x.car_id === idItem;
    });

    if (index > -1) {
      data.splice(index, 1);
    }

    this.dataSource.data = data;
  }

}
