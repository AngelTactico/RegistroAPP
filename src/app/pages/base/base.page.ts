import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';



@Component({
  selector: 'app-base',
  templateUrl: './base.page.html',
  styleUrls: ['./base.page.scss'],
})
export class BasePage implements OnInit, AfterViewInit {

  @ViewChild('titulo', {read: ElementRef, static:true}) titulo: ElementRef;

  constructor(
    private router: Router,
    private animationController: AnimationController,
    ) {  }

  public ngAfterViewInit(): void {
    const animation = this.animationController
    .create()
    .addElement(this.titulo.nativeElement)
    .iterations(Infinity)
    .duration(6000)
    .fromTo('transform','translate(0%)','translate(100%)')
    .fromTo('opacity', 0.2, 1);
    animation.play();
  }
 
  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
  goToRecuperarContra(){
    this.router.navigate(['/recuperar-contra'])
  }
  

}
