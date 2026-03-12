// chats-layout.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConversacionListComponent } from "../conversacion-list-component/conversacion-list-component";

@Component({
  selector: 'app-chats-layout',
  templateUrl: './chats-layout-component.html',
  styleUrls: ['./chats-layout-component.scss'],
  imports: [ConversacionListComponent]
})
export class ChatsLayoutComponent {

  constructor(private router: Router) {}

  onConversacionSeleccionada(id: number): void {
    this.router.navigate(['/chats', id]);
  }

  onNuevaConversacion(): void {
    this.router.navigate(['/chats', 'nueva']);
  }
}