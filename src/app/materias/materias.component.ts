import { Component, OnInit, ViewChild} from '@angular/core';
import {MateriasService} from '../services/materias.service';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort} from '@angular/material';
import {PreviewPdfComponent} from '../preview-pdf/preview-pdf.component';
import Swal from 'sweetalert2';
import {isObject} from 'util';
import {EditMateriaComponent} from '../edit-materia/edit-materia.component';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  constructor(
    private materiaService: MateriasService,
    public dialog: MatDialog
    ) { }

  displayedColumns: string[] = ['mat_nombre', 'mat_pdf', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.materiaService.getMaterias().subscribe(response => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  previewPdf(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(PreviewPdfComponent, dialogConfig);
  }

  openDialog(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';
    const dialogRef = this.dialog.open(EditMateriaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(updateMateria => {
      if (isObject(updateMateria)) {
        Swal.fire(
          'La materia se actualizo con éxito!',
          'Preciona el boton ok para continuar!',
          'success');
        this.updateRow(updateMateria);
      }
    });
  }

  updateRow(updateMateriaData) {
    const data = this.dataSource.data;

    // @ts-ignore
    const foundIndex = data.findIndex(x => x.mat_id === updateMateriaData.mat_id);

    data[foundIndex] = updateMateriaData;

    this.dataSource.data = data;
  }

  delete(data) {
    const params = {mat_id: data};
    Swal.fire({
      title: 'Estas seguro de elminar esta materia?',
      text: 'La materia se eliminara permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        return this.materiaService.deleteMateria(params).subscribe(response => {
          if (isObject(response)) {
            Swal.fire(
              'La materia se elimino con éxito',
              'Preciona ok para continuar',
              'success'
            );
            this.removeItemFromTable(data);
          }
        }, error => {
          Swal.fire(
            'Se ha producido un error al tratar de eliminar la materia!',
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
      return x.mat_id === idItem;
    });

    if (index > -1) {
      data.splice(index, 1);
    }

    this.dataSource.data = data;
  }

}
