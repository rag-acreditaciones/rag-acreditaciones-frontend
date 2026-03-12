import { Component, computed, inject, signal } from '@angular/core';
import { InformesTotalesList } from "../informes-totales-list/informes-totales-list";
import { InformesDocumentos } from "../informes-documentos/informes-documentos";
import { InformesChats } from "../informes-chats/informes-chats";
import { InformesUsuarios } from "../informes-usuarios/informes-usuarios";
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-informes-main',
  imports: [InformesTotalesList, InformesDocumentos, InformesChats, InformesUsuarios],
  templateUrl: './informes-main.html',
  styleUrl: './informes-main.css',
})
export class InformesMain {
    private authService = inject(AuthService);
    vista = signal<'documentos' | 'chats' | 'usuarios'>('documentos');
    esDemoMode = computed(() => !this.authService.isLoggedIn());
}
