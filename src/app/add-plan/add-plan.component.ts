import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {CarrerasService} from '../services/carreras.service';
import {SemestresService} from '../services/semestres.service';
import {MateriasService} from '../services/materias.service';
import {PlanService} from '../services/plan.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {
  addPlanForm: FormGroup;
  submitted = false;
  disableButton = false;
  load: boolean;
  carreras: any;
  semestres: any;
  materias: any;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AddPlanComponent>,
    private semestreService: SemestresService,
    private carreraService: CarrerasService,
    private materiaService: MateriasService,
    private planService: PlanService
  ) { }

  ngOnInit() {
    this.addPlanForm = this.formBuilder.group({
      car_id: new FormControl('', [Validators.required]),
      sem_id: new FormControl('', [Validators.required]),
      mat_id: new FormControl('', [Validators.required])
    });

    this.carreraService.getCarreras().subscribe(response => {
      this.carreras = response;
    });

    this.semestreService.getSemestres().subscribe(response => {
      this.semestres = response;
    });

    this.materiaService.getMaterias().subscribe(response => {
      this.materias = response;
    });
  }

  get form() {
    return this.addPlanForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addPlanForm.invalid) {
      return false;
    }

    this.disableButton = true;
    this.load = true;

    const params = {
      fk_use_id: 1,
      fk_car_id: this.form.car_id.value,
      fk_sem_id: this.form.sem_id.value,
      fk_mat_id: this.form.mat_id.value
    };

    console.log(params);

    this.planService.addPlan(params).subscribe(response => {
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
