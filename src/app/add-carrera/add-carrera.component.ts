import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {CarrerasService} from '../services/carreras.service';

@Component({
  selector: 'app-add-carrera',
  templateUrl: './add-carrera.component.html',
  styleUrls: ['./add-carrera.component.css']
})
export class AddCarreraComponent implements OnInit {
  addCarreraForm: FormGroup;
  submitted = false;
  disableButton = false;
  load: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddCarreraComponent>,
    private carreraService: CarrerasService
  ) { }

  ngOnInit() {
    this.addCarreraForm = this.formBuilder.group({
      car_nombre: new FormControl('', [Validators.required])
    });
  }

  get form() {
    return this.addCarreraForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addCarreraForm.invalid) {
      return false;
    }

    this.disableButton = true;
    this.load = true;

    const params = {
      car_nombre: this.form.car_nombre.value
    };

    this.carreraService.addCarrera(params).subscribe(response => {
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
