import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'documentos', pathMatch: 'full' },

    {
        path: 'documentos',
        loadChildren: () => import('./features/documentos/documentos.routes').then(m => m.DOCUMENTOS_ROUTES)
    },
    {
        path: 'chunks',
        loadChildren: () => import('./features/chunks/chunks.routes').then(m => m.CHUNKS_ROUTES)
    },
    {
        path: 'chats',
        loadChildren: () => import('./features/chats/chats.routes').then(m => m.CHATS_ROUTES)
    },
    {
        path: 'feedback',
        loadChildren: () => import('./features/feedback/feedback.routes').then(m => m.FEEDBACK_ROUTES)
    },
    {
        path: 'informes',
        loadChildren: () => import('./features/informes/informes.routes').then(m => m.INFORMES_ROUTES)
    },

    // Si escriben una URL que no existe, los mandamos al inicio
    { path: '**', redirectTo: 'documentos' }
];