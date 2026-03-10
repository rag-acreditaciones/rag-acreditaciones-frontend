import { Routes } from '@angular/router';
import { DocumentoListTablaComponent } from './documento-list-tabla/documento-list-tabla.component';
import { DocumentoVisorComponent } from './documento-visor-component/documento-visor.component';

// El equipo de Documentos importará sus componentes aquí:

export const DOCUMENTOS_ROUTES: Routes = [
  {
    path: '',
    component: DocumentoListTablaComponent,
  },
  {
    path: ':id/visor',
    component: DocumentoVisorComponent,
  },
];