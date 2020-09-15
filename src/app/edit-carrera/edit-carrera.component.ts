import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {CarrerasService} from '../services/carreras.service';

@Component({
  selector: 'app-edit-carrera',
  templateUrl: './edit-carrera.component.html',
  styleUrls: ['./edit-carrera.component.css']
})
export class EditCarreraComponent implements OnInit {
  CarUpdateForm: FormGroup;
  submitted = false;
  disableButtonUpdate = false;
  load: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataCarrera,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EditCarreraComponent>,
    private carreraService: CarrerasService
  ) { }

  ngOnInit() {
    this.CarUpdateForm = this.formBuilder.group({
      car_nombre: new FormControl(this.dataCarrera.car_nombre, [Validators.required])
    });
  }

  get form() {
    return this.CarUpdateForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.CarUpdateForm.invalid) {
      return false;
    }

    this.disableButtonUpdate = true;
    this.load = true;

    const params = {
      car_id: this.dataCarrera.car_id,
      car_nombre: this.form.car_nombre.value
    };

    this.carreraService.editCarrera(params).subscribe(response => {
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
