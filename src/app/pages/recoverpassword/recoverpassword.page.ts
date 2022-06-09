import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.page.html',
  styleUrls: ['./recoverpassword.page.scss'],
})
export class RecoverpasswordPage implements OnInit {
  formRecover:FormGroup;
  constructor(private authservice:AuthService, private fb:FormBuilder) { }

  ngOnInit() {
    this.formRecover = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
}

  recoverPassword(){
    this.authservice.recover(this.formRecover.get('email').value);
  }
}
