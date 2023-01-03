import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar){
    this.form = this.fb.group({
      usuario:["", Validators.required],
      password:["", Validators.required]
    });
  }

  ngOnInit(): void {

  }

  //
  /**
   * Control de login de usuario
   * Verificacion de credenciales
   */
  login(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    //TODO: verificar las credenciales del usuario

    if(usuario == "admin" && password=="1234"){     //credenciales validas

      this.transitionToDashboard();

    }else{    // credenciales no validas. Error

      this.errorMsg('Usuario o contraseña no valido', '');
      this.form.reset();

    }
  }


  /**
   * Presenta un mensaje de error en pantalla
   * @param mensaje mensaje a mostrar
   * @param accion texto para la accion (opcional)
   */
  errorMsg(mensaje: string, accion: string | undefined ){
    this._snackBar.open(mensaje, accion, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }


  /**
   * Transicion del login al escritorio
   */
  transitionToDashboard() {
    this.loading=true;

    //TODO: redireccion al escritorio

    setTimeout(() => {
      this.loading = false;
      },1500);
  }
}


