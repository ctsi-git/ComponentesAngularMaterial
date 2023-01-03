import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuarios: Usuario[] = [
    {usuario: "admin", nombre: 'Admin', apellido:"Admin", sexo: 'N/A'},
  ];

  constructor() { }

  // devuelve una copia del listado de usuarios
  getUsuario(){
    return this.listaUsuarios.slice();
  }

  // agrega el usuario provisto al arreglo
  agregarUsuario(user: Usuario){
    this.listaUsuarios.unshift(user);
  }

  // elimina el usuario correspondiente al index
  eliminarUsuario(index: number){
    this.listaUsuarios.splice(index,1);
  }
}
