import { Component, OnInit } from '@angular/core';
// Las clases Router y NavigationExtras son necesarias para que la página login le pase
// el nombre de usuario a la página home
import { Router, NavigationExtras } from '@angular/router';
// La clase ToastController sirve para mostrar mensajes emergente que duran un par de segundos
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /*
    Se genera el modelo user con dos claves (key), las que se comportan como propiedades
    de la clase LoginPage.
    En Modelo MVC, la clase "LoginPage" viene siendo el "Controlador", encargado de administrar
    la parte gráfica de la página web de login, por lo que trabaja coordinado con el
    archivo login.page.html
    Cada propiedad tiene su valor inicial y tiene su pareja de control HTML que es el <ion-input>
    De este modo el TAG:
    <ion-input type="text" [(ngModel)]="login.Usuario"></ion-input>
    ya sabe que tiene que trabajar con el modelo de Angular a través de la
    propiedad "login.Usuario".
    Fijarse que si se le colocan valores iniciales a login.usuario y login.password,
    estos aparecerán inmediatamente reflejados en la página login cuando esta
    se abra por primera vez.
  */

  public usuario: Usuario;
  /*
    Para poder trabajar con Router y poder navegar hacia la página "home", debemos primero
    pasar como parámetro e instanciar un objeto de la clase "Router". Fijarse que el tipo
    de dato, que se pasa en el constructor es "Router" con mayúscula, porque se trata de
    una clase y éstas parten con letra mayúscula, mientras que "router" con minúscula es
    el objeto de esa clase, que usaremos para ejecutar el método "navigate".
  */
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '','', '');
    this.usuario.correo = '';
    this.usuario.password = '';
    this.usuario.role = '';
  }

  public ngOnInit(): void {


    this.ingresar();
  }

  public ingresar(): void {

    if(!this.validarUsuario(this.usuario)) {
      return;
    }

    
  
  
    if(this.usuario.role == 'Alumno') {
  
      this.mostrarMensaje('¡Bienvenido!');
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };

      this.router.navigate(['/home'], navigationExtras);

      return;
    }

    else if(this.usuario.role == 'Profesor') {

      this.mostrarMensaje('¡Bienvenido!');
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };

      this.router.navigate(['/home-p'], navigationExtras);

      return;
    }

   else {

    this.mostrarMensaje('ERROR:Sin parametros de identidad, consulte mesa ayuda. XXX-XXXX-XXXX');

  }}

  /*
    Usaremos validateModel para verificar que se cumplan las
    validaciones de los campos del formulario
  */
  public validarUsuario(usuario: Usuario): boolean {

    const usu = this.usuario.buscarUsuarioValido(
      this.usuario.correo, this.usuario.password);

    if (usu) {
      this.usuario = usu;
      return true;
    }
    else {
      this.mostrarMensaje('Las credenciales no son correctas!');
      return false;
    }
  }

  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
  
  goToRecuperarContra(){
    this.router.navigate(['/recuperar-contra'])
  }

}
