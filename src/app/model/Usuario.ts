import { Injectable } from '@angular/core';
import { supabase } from '../supabase.service'; // Importa tu configuración de Supabase


@Injectable({
  providedIn: 'root'
})

export class Usuario {
<<<<<<< Updated upstream
  public correo = '';
  public password = '';
  public nombre = '';
  public preguntaSecreta = '';
  public respuestaSecreta = '';

  constructor(
    correo: string,
    password: string,
    nombre: string,
    preguntaSecreta: string,
    respuestaSecreta: string)
  {
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
  }

  public listaUsuariosValidos(): Usuario[] {
    const lista = [];
    lista.push(new Usuario('atorres@duocuc.cl', '1234', 'Ana Torres Leiva'
      , '¿Cuál es el nombre de su mascota?', 'gato'));
    lista.push(new Usuario('avalenzuela@duocuc.cl', 'qwer', 'Alberto Valenzuela Nuñez'
      , '¿Cuál es el nombre de tu mejor amigo?', 'juanito'));
    lista.push(new Usuario('cfuentes@duocuc.cl', 'asdf', 'Carla Fuentes Gonzales'
      , '¿Cuál es el lugar de nacimiento de su madre?', 'valparaiso'));
    return lista;
  }
=======
  public Correo = '';
  public Password = '';
  public Nombre = '';
  public PreguntaSecreta = '';
  public RespuestaSecreta = '';
  public Sede = '';
  public Role = '';

  constructor(
    Correo: string,
    Password: string,
    Nombre: string,
    PreguntaSecreta: string,
    RespuestaSecreta: string,
    Sede: string,
    Role: string

  ) {
    this.Correo = Correo;
    this.Password = Password;
    this.Nombre = Nombre;
    this.PreguntaSecreta = PreguntaSecreta;
    this.RespuestaSecreta = RespuestaSecreta;
    this.Sede = Sede;
    this.Role = Role;
  
  }

  public async obtenerUsuariosDesdeSupabase(): Promise<Usuario[]> {
    // Realiza una consulta a Supabase para obtener los usuarios
    const { data, error } = await supabase
      .from('Testing')
      .select('*');
>>>>>>> Stashed changes

    if (error) {
      // Manejar el error, como mostrar un mensaje o realizar alguna acción
      console.error('Error al obtener usuarios desde Supabase:', error);
      return [];
    }

    if (data) {
      // Mapear los datos de Supabase a objetos Usuario y devolverlos
      return data.map((user: any) => new Usuario(
        user.Correo,
        user.Password,
        user.Nombre,
        user.PreguntaSecreta,
        user.RespuestaSecreta,
        user.Sede,
        user.Role
      ));
    }

    return [];
  }



  public async buscarUsuarioValido(correo: string, password: string): Promise<Usuario | undefined> {
    const usuario = await this.obtenerUsuariosDesdeSupabase();
    
    console.log('Usuarios obtenidos desde Supabase:', usuario);
  
    const usuarioEncontrado = usuario.find(usu => usu.Correo === correo && usu.Password === password);
    if (usuarioEncontrado) {
      console.log('Usuario válido encontrado:', usuarioEncontrado);
      return usuarioEncontrado; // Devuelve el usuario encontrado
    } else {
      console.log('No se encontró un usuario válido para las credenciales proporcionadas.');
      return undefined; // Devuelve undefined si no se encuentra el usuario
    }
  }




  
}