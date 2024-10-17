import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})
export class ClassroomPage implements OnInit {

  constructor(private router:Router) { }

  navigateToAbout() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
