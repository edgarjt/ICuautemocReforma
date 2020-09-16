import { Component, OnInit, ViewChild} from '@angular/core';
import {SemestresService} from '../services/semestres.service';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort} from '@angular/material';
import {EditSemestreComponent} from '../edit-semestre/edit-semestre.component';
import {AddSemestreComponent} from '../add-semestre/add-semestre.component';
import {isObject} from 'util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-semestres',
  templateUrl: './semestres.component.html',
  styleUrls: ['./semestres.component.css']
})
export class SemestresComponent implements OnInit {
  message: any;

  constructor(
    private semestreService: SemestresService,
    public dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['sem_nombre', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.semestreService.getSemestres().subscribe(response => {
      if (response.length === 0) {
        return this.message = 'No hay datos que mostrar!';
      }
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  addSemestre() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddSemestreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( response => {
      if (isObject(response)) {
        Swal.fire('El semestre se registro con éxito.', 'Preciona ok para continuar!', 'success');
        this.tableAddItem(response);
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
    dialogConfig.data = data;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(EditSemestreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(updateSemestre => {
      if (isObject(updateSemestre)) {
        Swal.fire(
          'El semestre se actualizo con éxito!',
          'Preciona el boton ok para continuar!',
          'success');
        this.updateRow(updateSemestre);
      }
    });
  }

  updateRow(updateData) {
    const data = this.dataSource.data;

    // @ts-ignore
    const foundIndex = data.findIndex(x => x.sem_id === updateData.sem_id);

    data[foundIndex] = updateData;

    this.dataSource.data = data;
  }

  delete(data) {
    const params = {sem_id: data};
    Swal.fire({
      title: 'Estas seguro de elminar este semestre?',
      text: 'el semestre se eliminara permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        return this.semestreService.deleteSemestre(params).subscribe(response => {
          if (isObject(response)) {
            Swal.fire(
              'El semestre se elimino con éxito',
              'Preciona ok para continuar',
              'success'
            );
            this.removeItemFromTable(data);
          }
        }, error => {
          Swal.fire(
            'Se ha producido un error al tratar de eliminar el semstre!',
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
      return x.sem_id === idItem;
    });

    if (index > -1) {
      data.splice(index, 1);
    }

    this.dataSource.data = data;
  }

}
