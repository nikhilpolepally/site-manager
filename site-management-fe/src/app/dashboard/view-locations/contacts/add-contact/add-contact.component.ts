import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  addContact!: FormGroup
  token!: string
  constructor(
    private _model: ModalController,
    private _contactService: ContactsService,
    private _router: Router,
    private alertController:AlertController,
    private device:Device,
    private fb: FormBuilder,) {

    const path = this._router.url.split('?')[0];
    this.token = path.split('/').filter(x => x !== '')[2];

  }

  ngOnInit() {
    this.addContact = this.fb.group({
      FirstName: [null, [Validators.required]],
      LastName: [null, [Validators.required]],
      Email: [null,],
      Mobile: [null, [Validators.required]],
      Role: [null, [Validators.required]],
    });
  }


  cancel() {
    this._model.dismiss();
  }

  confirm() {
    if (!this.addContact.valid) {
      return;
    }
    console.log(this.addContact.value);
    console.log(this.token);
    this._contactService.create(this.addContact.value, this.token, this.device.uuid).subscribe({
      next: async (response) => {
        if (response.Status == "success") {
          this.addContact.reset();
          const alert = await this.alertController.create({
            header: response.Status,
            message: response.Message,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this._model.dismiss();
                }
              }
            ],
          });
          alert.present();
        }
      },
      error: async (error) => {
        const alert = await this.alertController.create({
          header: 'Failed',
          message: 'Missing mandatory fields',
          buttons: [
            {
              text: 'Ok',
            }
          ],
        });
        alert.present();
      }
    })

  }

}
