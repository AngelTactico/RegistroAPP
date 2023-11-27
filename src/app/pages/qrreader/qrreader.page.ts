
import { JsonPipe } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.page.html',
  styleUrls: ['./qrreader.page.scss'],
})
export class QrreaderPage implements AfterViewInit {

  @ViewChild('video', { static: false })
  private video: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas: ElementRef;

  @ViewChild('fileinput', { static: false })
  private fileinput: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement = null;

  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: String = '';
  public horaFin: String = '';
  public horaInicio: String = '';
  public idAsignatura: String = '';
  public nombreAsignatura: String = '';
  public nombreProfesor: String = '';
  public seccion: String = '';
  public sede: String = '';
  public asistencia: String ='';

  public constructor(private loadingController: LoadingController, private router: Router, private toastController: ToastController) {

  }

  ngAfterViewInit() {
    this.limpiarDatos();
  }

  goToback(){
    this.router.navigate(['/'])
  }

  public limpiarDatos(): void {
    this.escaneando = false;
    this.loading = null;
    this.datosQR = "" ;
    (document.getElementById('input-file') as HTMLInputElement).value = '';

  }
  public async comenzarEscaneoQR() {
    this.limpiarDatos();
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }

    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;
    console.log(w + ' ' + h);

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      this.mostrarDatosQR(this.datosQR);
    }
    return this.datosQR !== '';
  }

  public mostrarDatosQR(datosQR: string): void{
    const objetoQR = JSON.parse(datosQR);
    this.bloqueInicio = objetoQR.bloqueInicio;
    this.bloqueTermino = objetoQR.bloqueTermino;
    this.dia = objetoQR.dia;
    this.horaFin = objetoQR.horaFin;
    this.horaInicio = objetoQR.horaInicio;
    this.idAsignatura = objetoQR.idAsignatura;
    this.nombreAsignatura = objetoQR.nombreAsignatura;
    this.nombreProfesor = objetoQR.nombreProfesor;
    this.seccion = objetoQR.seccion;
    this.sede = objetoQR.sede;
    this.asistencia = 'Ausente';
  }

  public LimpiarDatosQR():void{
    if (this.bloqueInicio == 0)
    {this.mostrarMensaje('Primero debes estar en una clase');}
    else {

    this.bloqueInicio = 0;
    this.bloqueTermino = 0;
    this.dia = '';
    this.horaFin = '';
    this.horaInicio = '';
    this.idAsignatura = '';
    this.nombreAsignatura = '';
    this.nombreProfesor = '';
    this.seccion = '';
    this.sede = '';
    this.asistencia = '';

    this.mostrarMensaje('Has salido de clases con exito');
    }
  }


  public MarcarAsistencia():void{

    if (this.bloqueInicio != 0) { 
    this.asistencia = 'Presente';
    this.mostrarMensaje('Asistencia marcada con exito');
  }  else{
    this.mostrarMensaje('Primero debes ingresar a una clase valida');
  } }


  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log(1);
      } else {
        if (this.escaneando) {
          console.log(2);
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log(3);
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  public cargarImagenDesdeArchivo(): void {
    this.limpiarDatos();
    this.fileinput.nativeElement.click();
  }

  public verificarArchivoConQR(files: FileList): void {
    const file = files.item(0);
    const img = new Image();
    img.onload = () => {
      this.obtenerDatosQR(img);
    };
    img.src = URL.createObjectURL(file);
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

}
