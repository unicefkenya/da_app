import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../login/account.services'
import { TakeAttendance } from '../../home/takeattendance'
import { Teacher } from '../../home/classes'
import { ClassPopoverPage } from '../../home/classpopover.component'
import {  AddTeacherModal} from './addteacher'
import { NavController, ToastController, AlertController, PopoverController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage'


@Component({
  selector: 'page-teachers',
  templateUrl: 'teachers.html'
})
export class HDTeachersPage implements OnInit {

  content: any
  text: any
  teachers:Teacher[]
  load: boolean = false
  index: number = 0
  event: string
  takeattendance = new TakeAttendance()

  toast: any
  confirm: any
  constructor(public navCtrl: NavController,
    private popoverCtrl: PopoverController, private modalctrl: ModalController,
    private storage: Storage, private account: AccountService,
    private toastctrl: ToastController, private alertctrl: AlertController) {

  }
  ngOnInit() {
    this.getteachers()
    this.event = new Date().toISOString()
  }
  datechange(value) {
    console.log(this.event)
  }
  presentModal(student, type) {
    // if (student == 'a') {
    //   let modal = this.modalctrl.create(AddTeacherModal, { type: type,class:this.selectedclass.id });
    //    modal.present();
    // } else {
    //   let modal = this.modalctrl.create(AddTeacherModal, { student: student, type: type,class:this.selectedclass.id });
    //    modal.present();
    // }
   
  }
  showtoast(name: string, status: boolean) {
    if (this.toast) {
      this.toast.dismiss()
    }
    let message =name
    if (status) {
      message = name + "  is Present";
    }
    this.toast = this.toastctrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    this.toast.onDidDismiss(() => {
      this.toast = null
    });

    this.toast.present()
  }
  onchange(val, name) {
    console.log(val)
    if (val) {
      this.showtoast(name, val)
    }

  }
  getteachers() {
    this.storage.get("teachers").then((data) => {
      this.teachers = data
    })
  }



  attendance() {

  }

}
