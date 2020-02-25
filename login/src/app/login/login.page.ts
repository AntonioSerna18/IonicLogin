import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();

  constructor(private router: Router, private authSvc: AuthService, public toastController: ToastController, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async onLogin() {
    const user = await this.authSvc.onLogin(this.user);


    if (user) {
      console.log('¡Inicio de sesión éxitoso!');
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión',
        duration: 2000
      });
      this.router.navigateByUrl('/');
      loading.present();
    } else {
      console.log('¡Inicio de sesión fallido!');
      const toast = await this.toastController.create({
        message: '¡Ha ocurrido un error al iniciar sesión! Revisa tus datos y vuelve a intentarlo...',
        position: 'middle',
        color: 'danger',
        duration: 2000,
        translucent: false
      });
      toast.present();
    }
  }

}
