import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LocationsComponent } from './locations/locations.component';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddLocationsComponent } from './add-locations/add-locations.component';
import { ViewLocationsComponent } from './view-locations/view-locations.component'
import { ContactsComponent } from './view-locations/contacts/contacts.component'
import { AddContactComponent } from './view-locations/contacts/add-contact/add-contact.component'


const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'locations',
        component: LocationsComponent,
      },
      {
        path: 'locations/:id',
        component: ViewLocationsComponent,
      },
      {
        path: 'locations/:id/addcontact',
        component: ContactsComponent,
      },
    ]
  },

]

@NgModule({
  declarations: [LocationsComponent, AddLocationsComponent, ViewLocationsComponent, ContactsComponent, AddContactComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
