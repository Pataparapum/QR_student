import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, createAnimation, IonCard } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  private animation?: Animation;

  constructor(private router:Router, private animationCrl:AnimationController) {

  }
    


  navigateToAbout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    
  }
}
