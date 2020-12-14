import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ContactoServices } from '../services/contacto.services';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [ContactoServices]

})
export class ContactoComponent implements OnInit {
  sendMessageGroup: FormGroup;
  submitted = false;
  disableButtonSend = false;
  load: boolean;
  alertSucces = false;
  alertDanger = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private _ContactoService: ContactoServices
  ) {}

  ngOnInit() {
    this.sendMessageGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      career: new FormControl('',[Validators.required]),
      system: new FormControl('',[Validators.required]),
    });
  }

  get form() {
    return this.sendMessageGroup.controls
  };

  onSubmit(): any {
    this.submitted = true;

    if (this.sendMessageGroup.invalid) {
      return false;
    }

    this.disableButtonSend = true;
    this.load = true;

    const params = {
      name: this.form.name.value,
      phone: this.form.phone.value,
      email: this.form.email.value,
      career: this.form.career.value,
      system: this.form.system.value,
    };

    console.log(params);
    this._ContactoService.contacto(params).subscribe(response => {
      this.alertSucces = true;
      this.message = 'Mensaje enviado correctamente';
      this.load = false;
      this.disableButtonSend = false;

      console.log(response);
    }, error => {
      this.alertDanger = true;
      this.message =  'A ocurrido un error al enviar el mensaje de contacto.';
      this.load = false;
      this.disableButtonSend = false;

      console.log(error);
    });


  }

}
