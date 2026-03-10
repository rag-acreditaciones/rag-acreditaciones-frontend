import { Routes } from '@angular/router';
import { DocumentoListTablaComponent } from './documento-list-tabla/documento-list-tabla.component';

// El equipo de Documentos importará sus componentes aquí:

export const DOCUMENTOS_ROUTES: Routes = [
  {
    path: '',
    component: DocumentoListTablaComponent,
  },
];