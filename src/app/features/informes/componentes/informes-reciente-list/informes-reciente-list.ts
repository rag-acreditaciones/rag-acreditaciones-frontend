import { Component, input } from '@angular/core';
import { ActividadReciente } from '../../interfaces/informe.model';
import { InformesRecienteItem } from "../informes-reciente-item/informes-reciente-item";
import { actividadRecienteDemoData } from '../../interfaces/informe-demo';

@Component({
  selector: 'app-informes-reciente-list',
  imports: [InformesRecienteItem],
  templateUrl: './informes-reciente-list.html',
  styleUrl: './informes-reciente-list.css',
})
export class InformesRecienteList {
  reciente = input.required<any>({alias: 'latest-user'});
}
