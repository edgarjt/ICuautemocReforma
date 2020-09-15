import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {SemestresService} from '../services/semestres.service';

@Component({
  selector: 'app-edit-semestre',
  templateUrl: './edit-semestre.component.html',
  styleUrls: ['./edit-semestre.component.css']
})
export class EditSemestreComponent implements OnInit {
  SemUpdateForm: FormGroup;
  submitted = false;
  disableButtonUpdate = false;
  load: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataSemestre,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EditSemestreComponent>,
    private semestreService: SemestresService
  ) { }

  ngOnInit() {
    this.SemUpdateForm = this.formBuilder.group({
      sem_nombre: new FormControl(this.dataSemestre.sem_nombre, [Validators.required])
    });
  }

  get form() {
    return this.SemUpdateForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.SemUpdateForm.invalid) {
      return false;
    }

    this.disableButtonUpdate = true;
    this.load = true;

    const params = {
      sem_id: this.dataSemestre.sem_id,
      sem_nombre: this.form.sem_nombre.value
    };

    this.semestreService.editSemestre(params).subscribe(response => {
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
