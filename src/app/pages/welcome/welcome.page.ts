import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  user:User;
  constructor(private router:Router) { }

  ngOnInit() {
    
  }

  async ionViewDidEnter() {
    
  }

  goToMyAccount(){
    this.router.navigate(['myaccount']);
  }

  goToShoppingCart(){
    this.router.navigate(['shoppingcart']);
  }

}
