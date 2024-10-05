import { Injectable, Type } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { messageServiceBody } from './custom-modal.interfaces';
import { MessageSeverity } from './message-severity.enum';

@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  ref: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  show<T>(
    component: Type<T>,
    config: DynamicDialogConfig,
    modalBody: messageServiceBody
  ) {
    this.ref = this.dialogService.open(component, config);
    this.ref.onClose.subscribe((modal) => {
      if (!modal) {
        this.messageService.add({
          severity: MessageSeverity.ERROR,
          summary: 'Sus cambios no fueron guardados',
          detail: 'Intente nuevamente',
        });
      } else {
        this.messageService.add(modalBody);
      }
    });
  }
}
