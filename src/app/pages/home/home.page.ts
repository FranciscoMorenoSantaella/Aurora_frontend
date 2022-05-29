import {
  AfterContentChecked,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { IonSegment } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements AfterContentChecked {

  @ViewChild('segment') segment: IonSegment;
  segmentaux: Boolean = true;
  formLogin: FormGroup;
  formSignUp: FormGroup;



  constructor(private router: Router, private fb: FormBuilder) {}

  async ngOnInit() {
    this.formLogin = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.formSignUp = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['',[Validators.required, Validators.minLength(6)]],

    });
  }

  ngAfterContentChecked(): void {
    
  }

  segmentChanged($event) {
    if (this.segment.value == 'login') {
      this.segmentaux = true;
    } else if (this.segment.value == 'signup') {
      this.segmentaux = false;
    }
  }

  public login(user:User){
    this.router.navigate(['welcome']);
  }


  public signUp(user:User){
    
  }

}


