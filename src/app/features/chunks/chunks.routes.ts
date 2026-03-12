import { Routes } from '@angular/router';
import { DdocumentChunkScreen } from './components/ddocument-chunk-screen/ddocument-chunk-screen';
import { SchunkSearcherScreen } from './components/schunk-searcher-screen/schunk-searcher-screen';

// El equipo de Chunks importará sus componentes aquí:

export const CHUNKS_ROUTES: Routes = [
  { path: '', component: SchunkSearcherScreen },
  { path: 'searcher', component: SchunkSearcherScreen },
  { path: ':docId', component: DdocumentChunkScreen },
];
