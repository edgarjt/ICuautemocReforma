import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {UsersService} from '../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  UserData: any;
  UserUpdateForm: FormGroup;
  submitted = false;
  disableButtonUpdate = false;
  load: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataUser,
    private formBuilder: FormBuilder,
    private userServices: UsersService,
    private matDialogRef: MatDialogRef<EditUserComponent>
  ) { }

  ngOnInit() {
    this.UserUpdateForm = this.formBuilder.group({
      name: new FormControl(this.dataUser.name, [Validators.required]),
      surname: new FormControl(this.dataUser.surname, [Validators.required]),
      email: new FormControl(this.dataUser.email, [Validators.required]),
    });
  }

  get form() {
    return this.UserUpdateForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.UserUpdateForm.invalid) {
      return false;
    }

    this.disableButtonUpdate = true;
    this.load = true;

    const params = {
      id: this.dataUser.id,
      name: this.form.name.value,
      surname: this.form.surname.value,
      email: this.form.email.value
    };

    console.log(params);

    this.userServices.updateUser(params).subscribe(response => {
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
