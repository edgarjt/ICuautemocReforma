import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {MateriasService} from '../services/materias.service';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html',
  styleUrls: ['./add-materia.component.css']
})
export class AddMateriaComponent implements OnInit {
  addMateriaForm: FormGroup;
  submitted = false;
  disableButton = false;
  load: boolean;
  namePdf: string;
  FilePdf: any;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddMateriaComponent>,
    private matService: MateriasService
  ) { }

  ngOnInit() {
    this.namePdf = 'No hay pdf seleccionado';

    this.addMateriaForm = this.formBuilder.group({
      mat_nombre: new FormControl('', [Validators.required])
    });
  }

  get form() {
    return this.addMateriaForm.controls;
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

    if (this.addMateriaForm.invalid) {
      return false;
    }

    this.disableButton = true;
    this.load = true;

    const formData = new FormData();

    if (this.FilePdf) {
      formData.append('mat_pdf', this.FilePdf.files[0]);
    }

    formData.append('mat_nombre', this.form.mat_nombre.value);

    console.log(formData);

    this.matService.addMateria(formData).subscribe(response => {
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
