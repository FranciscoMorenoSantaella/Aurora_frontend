import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerc',
  templateUrl: './headerc.component.html',
  styleUrls: ['./headerc.component.scss'],
})
export class HeadercComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
  
  goToProducts(){
    this.router.navigate(['products']);
  }


}
