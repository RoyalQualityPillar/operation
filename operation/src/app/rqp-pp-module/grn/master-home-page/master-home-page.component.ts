import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-master-home-page',
  standalone: false,
  templateUrl: './master-home-page.component.html',
  styleUrl: './master-home-page.component.scss'
})
export class MasterHomePageComponent {

  constructor(private router: Router, private cookieService: CookieService) { }


  onMaterial() {
    this.router.navigate(['./rqpoperationui/pp/material']);
  }
}
