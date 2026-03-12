import { Component, inject, signal } from '@angular/core';
import { DoughnutChart } from "../chart/doughnut-chart/doughnut-chart";
import { LineChart } from "../chart/line-chart/line-chart";
import { CantidadesPorEtiqueta, HorasPunta, ActividadDiaria } from '../../interfaces/informe.model';
import { chatsSeccionDemoData, horaPuntaDemoData, actividadDiariaDemoData } from '../../interfaces/informe-demo';
import { DashboardService } from '../../service/servicio-informes';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-informes-chats',
  imports: [DoughnutChart, LineChart],
  templateUrl: './informes-chats.html',
  styleUrl: './informes-chats.css',
})
export class InformesChats {
  private informesService = inject(DashboardService);
  private authService = inject(AuthService);

  chatsSeccion = signal<CantidadesPorEtiqueta[] | []>([]);
  horaPunta = signal<HorasPunta[] | []>([]);
  actividadDiaria = signal<ActividadDiaria[] | []>([]);

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.informesService.getChatsPorSeccion().pipe()
        .subscribe(data => this.chatsSeccion.set(data));

      this.informesService.getHorasPunta().pipe()
        .subscribe(data => this.horaPunta.set(data));

      this.informesService.getActividadDiaria({
        fechaDesde: '2026-01-01',
        fechaHasta: '2026-12-31'
      }).subscribe(data => this.actividadDiaria.set(data));
    } else {
      this.chatsSeccion.set(chatsSeccionDemoData);
      this.horaPunta.set(horaPuntaDemoData);
      this.actividadDiaria.set(actividadDiariaDemoData);
    }
  }
}
