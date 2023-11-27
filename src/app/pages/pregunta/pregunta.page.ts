import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  public respuesta: string ="";

  /*
    En el constructor del HomePage se ponen como parametros los siguientes objetos:
      (1) activeroute (del tipo de dato ActivatedRoute) y router (del tipo de dato Router),
      que se usarán para obtener los datos enviados por la página que invocó a "home".
      (2) alertController (del tipo de dato AlertController), que se usará para mostrar
      mensajes emergentes en la pantalla.

    Nótese que los parámetros tuvieron que declararse con "private", y esto es necesario
    para que los parámetros pasen a considerarse automáticamente como propiedades
    de la clase "HomePage" y de este modo puedan usarse dentro de los otros métodos.
   */
   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController) {

    // Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => {       // Utilizamos expresión lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validar que tenga datos extras

        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;

      } else {
        /*
          Si no vienen datos extra desde la página anterior, quiere decir que el usuario
          intentó entrar directamente a la página home sin pasar por el login,
          de modo que el sistema debe enviarlo al login para que inicie sesión.
        */
        this.router.navigate(['/login']);
      }
  });
}

public ngOnInit() {
}


  public mostrarDatosPersona(): void {

    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    if (this.usuario.respuestaSecreta.trim() === this.respuesta) {
      this.presentAlert('CORRECTO', 'TU CONTRASEÑA ES '
        + this.usuario.password);
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    let mensaje = '¡LO SENTIMOS PERO LOS DATOS INGRESADOS NO SON CORRECTOS!';

    this.presentAlert('INCORRECTO', mensaje);
  }

  // Este método sirve para mostrar el mensaje emergente
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
