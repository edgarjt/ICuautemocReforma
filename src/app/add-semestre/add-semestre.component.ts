import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {SemestresService} from '../services/semestres.service';

@Component({
  selector: 'app-add-semestre',
  templateUrl: './add-semestre.component.html',
  styleUrls: ['./add-semestre.component.css']
})
export class AddSemestreComponent implements OnInit {
  addSemestreForm: FormGroup;
  submitted = false;
  disableButton = false;
  load: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddSemestreComponent>,
    private semestreService: SemestresService
  ) { }

  ngOnInit() {
    this.addSemestreForm = this.formBuilder.group({
      sem_nombre: new FormControl('', [Validators.required])
    });
  }

  get form() {
    return this.addSemestreForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addSemestreForm.invalid) {
      return false;
    }

    this.disableButton = true;
    this.load = true;

    const params = {
      sem_nombre: this.form.sem_nombre.value
    };

    this.semestreService.addSemestre(params).subscribe(response => {
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
