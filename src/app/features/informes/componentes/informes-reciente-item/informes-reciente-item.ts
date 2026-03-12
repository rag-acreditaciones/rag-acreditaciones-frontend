import { Component, input } from '@angular/core';

@Component({
  selector: '[app-informes-reciente-item]',
  imports: [],
  templateUrl: './informes-reciente-item.html',
  styleUrl: './informes-reciente-item.css',
})
export class InformesRecienteItem {
    accion = input.required<any>({alias: 'action'});
}
