import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelModule,
    MessagesModule,
    ButtonModule,
    PasswordModule,
    NgxPaginationModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
