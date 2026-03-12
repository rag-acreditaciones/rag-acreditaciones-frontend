import { Routes } from '@angular/router';
import { CalidadPanelComponent } from './calidad/ui/calidad-panel-component/calidad-panel-component';

// El equipo de Feedback importará sus componentes aquí:

export const FEEDBACK_ROUTES: Routes = [
  { path: 'panel-calidad', component: CalidadPanelComponent },
];
