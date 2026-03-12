import { Component, inject, signal } from '@angular/core';
import { InformesRecienteList } from "../informes-reciente-list/informes-reciente-list";
import { InformesRankingList } from "../informes-ranking-list/informes-ranking-list";
import { ActividadReciente, CantidadesPorEtiqueta, UsuarioRanking } from '../../interfaces/informe.model';
import { BarChart } from "../chart/bar-chart/bar-chart";
import { DashboardService } from '../../service/servicio-informes';
import { actividadRecienteDemoData, rankingUsuariosDemoData, usuariosRolDemoData } from '../../interfaces/informe-demo';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-informes-usuarios',
  imports: [InformesRecienteList, InformesRankingList, BarChart],
  templateUrl: './informes-usuarios.html',
  styleUrl: './informes-usuarios.css',
})
export class InformesUsuarios {
  private informesService = inject(DashboardService);
  private authService = inject(AuthService);

  usuariosRol = signal<CantidadesPorEtiqueta[] | []>([]);
  ranking = signal<UsuarioRanking[] | []>([]);
  reciente = signal<ActividadReciente[] | []>([]);

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.informesService.getUsuariosPorRol()
        .subscribe(data => this.usuariosRol.set(data));

      this.informesService.getRankingUsuarios()
        .subscribe(data => this.ranking.set(data));

      this.informesService.getActividadReciente()
        .subscribe(data => this.reciente.set(data));
    } else {
      this.usuariosRol.set(usuariosRolDemoData);
      this.ranking.set(rankingUsuariosDemoData);
      this.reciente.set(actividadRecienteDemoData);
    }
  }
}
