import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from './../shared/user.class';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();

  constructor(private authSvc: AuthService, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  async onRegister() {
    const user = await this.authSvc.onRegister(this.user);

    if (user) {
      console.log('Successfully created user...');
      const toast = await this.toastController.create({
        message: '¡Tu cuenta ha sido creada correctamente!',
        position: 'middle',
        duration: 2000,
        color: 'success',
        translucent: false
      });
      this.router.navigateByUrl('/');
      toast.present();
    } else {
      console.log('Successfully created user...');
      const toast = await this.toastController.create({
        message: '¡Tu cuenta no se pudo crear! Vuelve a intentarlo...',
        position: 'middle',
        duration: 2000,
        color: 'danger',
        translucent: false
      });
      toast.present();
    }
  }

}
