import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']

})
export class ContactoComponent implements OnInit {
  sendMessageGroup: FormGroup;
  submitted = false;
  disableButtonSend = false;
  load: boolean;
  alertSucces = false;
  alertDanger = false;
  message: string;

  constructor(private formBuilder: FormBuilder) {}

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

  onSubmit() {
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
      system: this.form.career.value,
      

    };

    console.log(params);
    this.load = false;
    this.disableButtonSend = false;


  }

}
