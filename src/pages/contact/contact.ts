import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { LoginPage } from '../login/login.component'
import { HelpPage } from '../help/help'
import { HDSync } from '../sync/sync'
import { PasswordPage } from '../password/password.component'
import { AccountService } from '../login/account.services'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  user: any
  error: any
  load: boolean = false
  constructor(public navCtrl: NavController,
    private app: App, private storage: Storage,
    private account: AccountService,
    private alertctrl: AlertController) {

  }
  logout() {
    // this.storage.remove("profile");
    // this.storage.remove("subjects")
    // this.storage.remove("classes")
    // this.storage.remove("offline")
    this.storage.remove("loggedin").then(() => {
      console.log("logged out")
      this.gotologin()
    })
  }
  downloadlist() {
    this.load = true
    this.account.profilev2().subscribe((data) => {
      console.log("dumm", data);
      let us: any = {}
        this.load = false
           this.showalert("Success", "Class list up to date")
      // this.storage.set("classes", data.classes).then(() => {
      //   this.load = false
      //   this.showalert("Success", "Class list up to date")
      // })
    },error=>{
      this.load = false
      console.log("this ***", error)
      if (error != null) {

      }
      else {
        this.showalert("No Internet", "Make sure you have a working internet connection")
      }


      this.storage.remove("user");
    });
  }
  showalert(title, message) {
    let alert = this.alertctrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }
  gotologin() {
    //this.navCtrl.setRoot(Loginpage)
    this.app.getRootNav().setRoot(LoginPage)
  }

  gosync() {
    this.navCtrl.push(HDSync)
  }
  gotopassword() {

    this.navCtrl.push(PasswordPage);
  }

  help() {

    this.navCtrl.push(HelpPage);
  }


  ngOnInit() {
    this.getprofile()
  }
  getprofile() {
    this.storage.get("profile").then((data) => {
      console.log(data)
      this.user = data
    })
  }
}
