import  Moment  from 'moment';
import { Classes } from './../../home/classes';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../login/account.services'
import { TakeAttendance } from '../../home/takeattendance'
import { Teacher } from '../../home/classes'
import { ClassPopoverPage } from '../../home/classpopover.component'
import { AddTeacherModal } from './addteacher'
import { NavController, ToastController, AlertController, PopoverController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage'


@Component({
  selector: 'page-teachers',
  templateUrl: 'teachers.html'
})
export class HDTeachersPage implements OnInit {
  school: number
  classes:Classes[]=[]
  content: any
  text: any
  teachers: Teacher[]
  load: boolean = false
  index: number = 0
  event: string
  takeattendance = new TakeAttendance()
  selectedteacher: Teacher
  toast: any
  confirm: any
  constructor(public navCtrl: NavController,
    private popoverCtrl: PopoverController, private modalctrl: ModalController,
    private storage: Storage, private account: AccountService,
    private toastctrl: ToastController, private alertctrl: AlertController) {

  }
  ngOnInit() {
    this.getclasses()
    this.getteachers()
    this.event = Moment().format("YYYY-MM-DD")
    this.onTeachersChange()
  }
  getclasses(){
    this.storage.get("classes").then(data=>{
      data.forEach(val=>{
        let cl:Classes= new Classes()
        cl._class=val._class
        cl.class_name=val.class_name
        cl.id=val.id
        cl.school=val.school
        cl.selected=false
        this.classes.push(cl)
      });
    });
  }
  onTeachersChange() {
    this.account.teacherchange$.subscribe((teacher) => {

      let teachs = this.teachers.filter(tc => tc.id === teacher.id)
      if (teachs.length > 0) {
        let teachindex = this.teachers.indexOf(this.teachers.filter(tc => tc.id === teacher.id)[0])
        this.teachers[teachindex] = teacher
      }
      else {
        this.teachers.push(teacher);
      }
    });
    this.account.teacherdelete$.subscribe((teacher) => {
      let teachs = this.teachers.filter(tc => tc.id === teacher.id)
      if (teachs.length > 0) {
        let teachindex = this.teachers.indexOf(this.teachers.filter(tc => tc.id === teacher.id)[0])
        this.teachers.splice(teachindex, 1)
      }
    })
    this.account.newclasslist$.subscribe(data=>{
        this.getteachers()
        this.getclasses()
    })
    this.account.classeschange$.subscribe(()=>{
      this.getclasses()
    })
   
  }
  getprofile() {
    this.storage.get("profile").then((data) => {
      this.school = data.school
    })
  }
  onteachersChange() {
    this.account.teacherchange$.subscribe(data => {
      //
    })
  }
  datechange(value) {
    console.log(this.event)
  }
  presentModal(teacher, type) {
    if (teacher == 'a') {
      let modal = this.modalctrl.create(AddTeacherModal, { type: type,classes:this.classes });
      modal.present();
    } else {
      let modal = this.modalctrl.create(AddTeacherModal, { teacher: teacher, type: type ,classes:this.classes });
      modal.present();
    }

  }
  showtoast(name: string, status: boolean) {
    if (this.toast) {
      this.toast.dismiss()
    }
    let message = name
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
  deleteConfirm(teacher: Teacher) {
    let confirm = this.alertctrl.create({
      title: 'Delete Teacher',
      message: 'Do you want to delete this teacher?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteteacher(teacher)
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  deleteteacher(teacher: Teacher) {
    this.account.deleteteacher(teacher).then((data)=>{
      console.log("Teacher Deleted")
    },error=>{
      console.log("delete failed ",error)
    })

  }



  attendance() {

  }

}
