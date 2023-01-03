import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listUsuarios: Usuario[] = [];

  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'sexo', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private _usuarioService: UsuarioService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // solicita el listado de usuarios y carga la fuente de datos
  cargarUsuarios(){
    this.listUsuarios = this._usuarioService.getUsuario();
    this.dataSource=new MatTableDataSource(this.listUsuarios);
  }

  // maneja la eliminacion de usuario
  eliminarUsuario(index: number){
    this._usuarioService.eliminarUsuario(index);
    this.infoMsg('El Usuario fue eliminado con exito!', '');
    this.cargarUsuarios();
  }

  // aplica los filtros al listado de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Presenta un mensaje de error en pantalla
   * @param mensaje mensaje a mostrar
   * @param accion texto para la accion (opcional)
   */
  infoMsg(mensaje: string, accion: string | undefined ){
    this._snackBar.open(mensaje, accion, {
      duration: 1500,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
