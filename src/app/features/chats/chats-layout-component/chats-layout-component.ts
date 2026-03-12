// chats-layout.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversacionListComponent } from '../conversacion-list-component/conversacion-list-component';
import { ChatComponent } from '../chat-component/chat-component';

@Component({
  selector: 'app-chats-layout',
  standalone: true,
  imports: [CommonModule, ConversacionListComponent, ChatComponent],
  templateUrl: './chats-layout-component.html',
  styleUrls: ['./chats-layout-component.scss'],
})
export class ChatsLayoutComponent {
  readonly conversacionSeleccionadaId = signal<number | null>(null);

  seleccionarConversacion(id: number): void {
    this.conversacionSeleccionadaId.set(id);
  }
}