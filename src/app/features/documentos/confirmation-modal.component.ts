import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="modal-overlay" (click)="onCancel()">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar eliminación</h5>
            <button type="button" class="btn-close" (click)="onCancel()"></button>
          </div>
          <div class="modal-body">
            <p>{{ message() }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger btn-modal" (click)="onConfirm()">
              Eliminar
            </button>
            <button type="button" class="btn btn-secondary btn-modal" (click)="onCancel()">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1050;
    }

    .modal-dialog {
      background: white;
      border-radius: 0.25rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      width: 100%;
      max-width: 500px;
      margin: 1.75rem auto;
    }

    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
    }

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.5;
    }

    .btn-close {
      background: transparent;
      border: 0;
      font-size: 1.5rem;
      font-weight: 700;
      cursor: pointer;
      color: #000;
      opacity: 0.5;
      padding: 0;
    }

    .btn-close:hover {
      opacity: 0.75;
    }

    .modal-body {
      padding: 1rem;
    }

    .modal-footer {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      padding: 1rem;
      border-top: 1px solid #dee2e6;
    }

    .btn-modal {
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }

    .btn-modal:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    }

    .btn-modal:active {
      transform: translateY(0) !important;
    }

    button.btn-modal {
      cursor: pointer !important;
    }

    button.btn-modal:hover {
      cursor: pointer !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    }
  `],
})
export class ConfirmationModalComponent {
  visible = input(false);
  message = input('¿Estás seguro de que quieres eliminar este elemento?');
  confirm = output<void>();
  cancel = output<void>();

  onConfirm(): void {
    console.log('✅ onConfirm() - emitiendo confirm');
    this.confirm.emit();
  }

  onCancel(): void {
    console.log('❌ onCancel() - emitiendo cancel');
    this.cancel.emit();
  }
}
