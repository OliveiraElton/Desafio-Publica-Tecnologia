import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item/item.edit.component';
import { ContentComponent } from './content/content.component';
import { MenuComponent } from './menu/menu.component';
import { ContainerComponent } from './container/container.component';
import { ItemService } from './service/item.service';
import { ConfirmationService } from 'primeng/api';

const routes: Routes = [
  { path: 'item', component: ItemComponent },
  { path: 'item/edit', component: ItemEditComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemEditComponent,
    ContentComponent,
    MenuComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputSwitchModule,
    InputMaskModule,
    CurrencyMaskModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ItemService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
