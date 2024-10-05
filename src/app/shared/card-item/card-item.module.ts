import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './card-item.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CardItemComponent],
  imports: [CommonModule, CardModule, ButtonModule],
  exports: [CardItemComponent],
})
export class CardItemModule {}
