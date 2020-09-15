import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {MateriasService} from '../services/materias.service';

@Component({
  selector: 'app-edit-materia',
  templateUrl: './edit-materia.component.html',
  styleUrls: ['./edit-materia.component.css']
})
export class EditMateriaComponent implements OnInit {
  MatUpdateForm: FormGroup;
  submitted = false;
  disableButtonUpdate = false;
  load: boolean;
  namePdf: string;
  FilePdf: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataMateria,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EditMateriaComponent>,
    private matService: MateriasService
  ) { }

  ngOnInit() {
    this.MatUpdateForm = this.formBuilder.group({
      mat_nombre: new FormControl(this.dataMateria.mat_nombre, [Validators.required])
    });
    this.namePdf = this.dataMateria.mat_pdf;
  }

  get form() {
    return this.MatUpdateForm.controls;
  }

  dataPdf(e) {
    this.FilePdf = e.target;

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      this.namePdf = file.name;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.MatUpdateForm.invalid) {
      return false;
    }

    this.disableButtonUpdate = true;
    this.load = true;

    const formData = new FormData();

    if (this.FilePdf) {
      formData.append('mat_pdf', this.FilePdf.files[0]);
    }

    formData.append('mat_id', this.dataMateria.mat_id);
    formData.append('mat_nombre', this.form.mat_nombre.value);

    console.log(formData);

    this.matService.editMateria(formData).subscribe(response => {
      if (response) {
        this.load = false;
        this.matDialogRef.close(response);
      }

    }, error => {
      Swal.fire(
        'Ocurrio un error durante el proceso!',
        'Preciona el boton ok para continuar!',
        'error'
      );
      this.load = false;
      console.log(error);
    });

  }

}
