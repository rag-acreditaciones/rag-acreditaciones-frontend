import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegistroComponent } from './features/registro/registro.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  {
    path: 'documentos',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/documentos/documentos.routes').then((m) => m.DOCUMENTOS_ROUTES),
  },
  {
    path: 'chunks',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/chunks/chunks.routes').then((m) => m.CHUNKS_ROUTES),
  },
  {
    path: 'chats',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/chats/chats.routes').then((m) => m.CHATS_ROUTES),
  },
  {
    path: 'feedback',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/feedback/feedback.routes').then((m) => m.FEEDBACK_ROUTES),
  },
  {
    path: 'informes',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/informes/informes.routes').then((m) => m.INFORMES_ROUTES),
  },

  // Si escriben una URL que no existe, redirigimos al inicio
  { path: '**', redirectTo: '' },
];
