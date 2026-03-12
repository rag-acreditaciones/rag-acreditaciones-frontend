import { Routes } from "@angular/router";
import { ChatsLayoutComponent } from "./chats-layout-component/chats-layout-component";
import { ConversacionListComponent } from "./conversacion-list-component/conversacion-list-component";

export const CHATS_ROUTES: Routes = [
  {
    path: '',
    component: ChatsLayoutComponent,  // ← layout con sidebar
    children: [
      {
        path: '',                      // /chats → panel vacío o bienvenida
        component: ConversacionListComponent
      },
      
    ]
  }
];
