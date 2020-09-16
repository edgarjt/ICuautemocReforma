import {Component, OnInit, ViewChild} from '@angular/core';
import {PlanService} from '../services/plan.service';
import {CarrerasService} from '../services/carreras.service';
import {SemestresService} from '../services/semestres.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from "sweetalert2";
import {isObject} from "util";

@Component({
  selector: 'app-plan-estudios',
  templateUrl: './plan-estudios.component.html',
  styleUrls: ['./plan-estudios.component.css']
})
export class PlanEstudiosComponent implements OnInit {
  message: any;
  GetPlanForm: FormGroup;
  submitted = false;
  carreras: any;
  semestres: any;
  viewTable: boolean;
  load: boolean;

  constructor(
    private planStudio: PlanService,
    private carreraService: CarrerasService,
    private semestreService: SemestresService,
    private formBuilder: FormBuilder,
  ) { }

  displayedColumns: string[] = ['materia', 'plan', 'delete'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.GetPlanForm = this.formBuilder.group({
      car_id: new FormControl('', [Validators.required]),
      sem_id: new FormControl('', [Validators.required])
    });

    this.carreraService.getCarreras().subscribe(response => {
      this.carreras = response;
    });

    this.semestreService.getSemestres().subscribe(response => {
      this.semestres = response;
    });
  }

  get form() {
    return this.GetPlanForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.viewTable = false;

    if (this.GetPlanForm.invalid) {
      return false;
    }
    this.load = true;

    const params = {
      car_id: this.form.car_id.value,
      sem_id: this.form.sem_id.value
    };

    this.planStudio.getPlan(params).subscribe(response => {
      console.log(response);
      this.load = false;
      if (response.length === 0) {
        this.dataSource = new MatTableDataSource([]);
        Swal.fire('Sin datos que mostrar!', 'Cree un plan para poder ver esta sección.', 'warning');
        return false;
      }

      this.viewTable = true;
      this.dataSource = new MatTableDataSource(response);

    });

  }

  delete(data) {
    const params = {pln_id: data};
    Swal.fire({
      title: 'Estas seguro de elminar esta materia del plan?',
      text: 'La materia del plan se eliminra permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        return this.planStudio.deletePlan(params).subscribe(response => {
          if (isObject(response)) {
            Swal.fire(
              'La materia se elimino con éxito del plan',
              'Preciona ok para continuar',
              'success'
            );
            this.removeItemFromTable(data);
          }
        }, error => {
          Swal.fire(
            'Ocurrio un error durante el proceso!',
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
      return x.pln_id === idItem;
    });

    if (index > -1) {
      data.splice(index, 1);
    }

    this.dataSource.data = data;
  }

}
