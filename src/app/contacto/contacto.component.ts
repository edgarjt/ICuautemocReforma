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
      name: new FormControl('', [Validators.required])
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
      name: this.form.name.value

    };

    console.log(params);
    this.load = false;
    this.disableButtonSend = false;


  }

}
