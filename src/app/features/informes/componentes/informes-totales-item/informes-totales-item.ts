import { Component, input } from '@angular/core';

@Component({
  selector: 'app-informes-totales-item',
  imports: [],
  templateUrl: './informes-totales-item.html',
  styleUrl: './informes-totales-item.css',
})
export class InformesTotalesItem {
  total = input.required<any>({alias: 'totalCampo'});
  campo = input.required<any>({alias: 'campoNombre'});
}
