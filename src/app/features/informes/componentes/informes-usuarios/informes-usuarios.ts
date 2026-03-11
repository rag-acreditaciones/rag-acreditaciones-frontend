import { Component, inject, signal } from '@angular/core';
import { InformesRecienteList } from "../informes-reciente-list/informes-reciente-list";
import { InformesRankingList } from "../informes-ranking-list/informes-ranking-list";
import { CantidadesPorEtiqueta } from '../../interfaces/informe.model';
import { BarChart } from "../chart/bar-chart/bar-chart";
import { DashboardService } from '../../service/servicio-informes';
import { usuariosRolDemoData } from '../../interfaces/informe-demo';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-informes-usuarios',
  imports: [InformesRecienteList, InformesRankingList, BarChart],
  templateUrl: './informes-usuarios.html',
  styleUrl: './informes-usuarios.css',
})
export class InformesUsuarios {
  private informesService = inject(DashboardService);

  usuariosRol = signal<CantidadesPorEtiqueta[] | []>([]);

  ngOnInit(): void {
    this.informesService.getUsuariosPorRol()
      .subscribe(data => this.usuariosRol.set(data));
  }
    
  usuariosRolDemo: CantidadesPorEtiqueta[] = usuariosRolDemoData;
}
