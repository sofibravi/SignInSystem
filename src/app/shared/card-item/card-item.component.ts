import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CardItemComponent {
  @Input() data: any;
  @Input() button_label_1: string;
  @Input() button_label_2: string;
  @Input() hasDelete: boolean = false;
  @Output() actionTwo = new EventEmitter<number>();
  @Output() actionOne = new EventEmitter<number>();
  @Output() actionDelete = new EventEmitter<number>();

  isAdmin: boolean = this.authService.isAdmin();

  constructor(private authService: AuthService) {}

  onActionOne(id: number): void {
    this.actionOne.emit(id);
  }

  onActionTwo(id: number): void {
    this.actionTwo.emit(id);
  }

  onActionDelete(id: number): void {
    this.actionDelete.emit(id);
  }
}
