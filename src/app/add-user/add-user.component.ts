import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {UsersService} from '../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;
  disableButton = false;
  load: boolean;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get form() {
    return this.addUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log('Aqui me retorno');
    if (this.addUserForm.invalid) {

      return false;
    }

    this.disableButton = true;
    this.load = true;

    const nombre = this.form.name.value;
    const apellidos = this.form.surname.value;
    const correo = this.form.email.value;
    const contra = this.form.password.value;

    const params = {
      name: nombre,
      surname: apellidos,
      email: correo,
      password: contra

    };

    console.log(params);
    this.userService.addUser(params).subscribe(response => {
      this.load = false;
      this.dialogRef.close(response);

    }, error => {
      console.log(error);
      Swal.fire('Ocurrio un error en el proceso', 'Preciona ok para salir.', 'error');
      this.load = false;
    });


  }

}
