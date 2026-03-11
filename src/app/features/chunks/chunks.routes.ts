import { Routes } from '@angular/router';
import { DdocumentChunkScreen } from './components/ddocument-chunk-screen/ddocument-chunk-screen';

// El equipo de Chunks importará sus componentes aquí:

export const CHUNKS_ROUTES: Routes = [{ path: ':docId', component: DdocumentChunkScreen }];
