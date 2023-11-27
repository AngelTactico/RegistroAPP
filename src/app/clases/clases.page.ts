import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AnimationController } from '@ionic/angular';
import { Clase } from '../model/Clase';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', {read: ElementRef, static:true}) titulo: ElementRef;


  public usuario: Usuario;

 

  public clase: Clase = new Clase();

   constructor(
        private activeroute: ActivatedRoute
      , private loadingController: LoadingController
      , private router: Router
      , private alertController: AlertController s
      , private animationController: AnimationController
      , private toastController: ToastController) {

}

public ngAfterViewInit(): void {
  const animation = this.animationController
  .create()
  .addElement(this.titulo.nativeElement)
  .iterations(Infinity)
  .duration(5000)
  .fromTo('transform','translate(0%)','translate( 100%)')
  .fromTo('opacity', 0.5, 1);
  animation.play();
}



public ngOnInit() {
}

goToLogout(){
this.router.navigate(['/'])
}

public limpiarFormulario(): void {
  for (const [key, value] of Object.entries(this.clase)) {
      Object.defineProperty(this.clase, key, {value: ''});
    }
  }


  public mostrarDatosClase(): void {

    if (this.clase.id.trim() === '' && this.clase.seccion === '') {
      this.presentAlert('Clases', 'Para Ingresar los datos de clases, '
        + 'al menos debe tener un valor para el id o seccion.');
      return;
    }

    let mensaje = '<br>Nombre: ' + this.clase.nombre;
    mensaje += '<br>Clase: ' + this.clase.id;
    mensaje += '<br>Seccion: ' + this.clase.seccion;
    mensaje += '<br>Bloque Inicio: ' + this.clase.bloqueinicio;
    mensaje += '<br>Bloque Termino: ' + this.clase.bloquetermino;

    this.presentAlert('Clase', mensaje);
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToClases(){
    this.router.navigate(['/clases'])
  }


  goToHomep(){
    this.router.navigate(['/home-p'])
  }


}
