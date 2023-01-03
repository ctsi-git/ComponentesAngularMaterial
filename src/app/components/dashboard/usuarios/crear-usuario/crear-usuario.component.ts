import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  sexo: any[] = ["Masculino", "Femenino", "N/A"];
  form: FormGroup;


  constructor (private fb: FormBuilder,
               private _usuarioService: UsuarioService,
               private router: Router,
               private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      usuario: ["", Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      sexo: ["", Validators.required],
    })
  }

  // maneja el agregado de nuevo usuarios
  agregarUsuario(){
    const user: Usuario = {
      usuario: this.form.value.usuario,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      sexo: this.form.value.sexo
    }
    this._usuarioService.agregarUsuario(user);
    this.router.navigate(['/dashboard/usuarios']);
    this.infoMsg("Usuario Creado con Exito!", "", 2000);
  }

  /**
   * Presenta un mensaje en pantalla
   * @param mensaje mensaje a mostrar
   * @param accion texto para la accion (opcional)
   * @param duration tiempo que dura el mensaje en ms (1000 = 1 segundo)
   */
  public infoMsg(mensaje: string, accion: string, duration: number | undefined ){
    this._snackBar.open(mensaje, accion, {
      duration,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
  ngOnInit(): void {

  }

}
