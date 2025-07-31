import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalData } from '../components/alert-modal/alert-modal.model';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { ConfirmModalData } from '../components/confirm-modal/confirm-modal.model';

@Injectable({
  providedIn: 'root'
})
export class CommonModalService {

  constructor(private modalService: NgbModal) {
  }

  confirm(data: ConfirmModalData) {
    const defaults = {
      title: 'Confirmation',
      body: 'Are you sure to continue?',
      size: 'sm',
      backdrop: true,
      keyboard: true,
      okButtonText: 'Confirm',
      okButtonClass: 'btn-danger',
      cancelButtonText: 'Cancel',
      cancelButtonClass: 'btn-link'
    };

    const modalData = { ...defaults, ...data };

    const modalRef = this.modalService.open(ConfirmModalComponent, {
      size: modalData.size,
      backdrop: modalData.backdrop
    });
    modalRef.componentInstance.data = modalData;

    return modalRef.result;
  }

  alert(data: AlertModalData) {
    const defaults = {
      title: 'Information',
      body: 'This is a simple notification.',
      size: 'sm',
      backdrop: true,
      keyboard: true,
      okButtonText: 'Ok',
      okButtonClass: 'btn-primary'
    };

    const modalData = { ...defaults, ...data };

    const modalRef = this.modalService.open(ConfirmModalComponent, {
      size: modalData.size,
      backdrop: modalData.backdrop
    });
    modalRef.componentInstance.data = modalData;

    return modalRef.result;
  }

}
