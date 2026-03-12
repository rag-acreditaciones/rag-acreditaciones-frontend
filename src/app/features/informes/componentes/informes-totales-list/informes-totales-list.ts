import { Component, inject, OnInit, signal } from '@angular/core';
import { InformesTotalesItem } from "../informes-totales-item/informes-totales-item";
import { InformeTotal } from '../../interfaces/informe.model';
import { DashboardService } from '../../service/servicio-informes';
import { informeTotalDemoData } from '../../interfaces/informe-demo';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-informes-totales-list',
  imports: [InformesTotalesItem],
  templateUrl: './informes-totales-list.html',
  styleUrl: './informes-totales-list.css',
})
export class InformesTotalesList implements OnInit {
  private informesService = inject(DashboardService);
  private authService = inject(AuthService);

  informeTotal = signal<InformeTotal | null>(null);

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.informesService.getResumenGlobal()
        .subscribe(data => this.informeTotal.set(data));
    } else {
      this.informeTotal.set(informeTotalDemoData);
    }
  }
}