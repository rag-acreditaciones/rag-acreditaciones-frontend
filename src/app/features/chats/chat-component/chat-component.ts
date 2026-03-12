import {
  Component, Input, OnChanges, SimpleChanges,
  ViewChild, ElementRef, AfterViewChecked,
  inject, signal, ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MensajeService } from '../mensaje-service';
import { MensajeDTO } from '../conversacion-model';
import { MensajeComponent } from '../mensaje-component/mensaje-component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MensajeComponent],
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnChanges, AfterViewChecked {
 
  @Input({ required: true }) conversacionId!: number;
 
  @ViewChild('mensajesRef')  private mensajesRef!:  ElementRef<HTMLDivElement>;
  @ViewChild('inputRef')     private inputRef!:     ElementRef<HTMLTextAreaElement>;
 
  private readonly mensajeService = inject(MensajeService);
 
  readonly mensajes      = signal<MensajeDTO[]>([]);
  readonly cargando      = this.mensajeService.loadingPregunta;
  readonly cargandoLista = this.mensajeService.loadingMensajes;
 
  texto = '';
  private debeScroll = false;
 
  // ── Lifecycle ───────────────────────────────────────────────────────────────
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversacionId'] && this.conversacionId) {
      this.cargarMensajes();
    }
  }
 
  ngAfterViewChecked(): void {
    if (this.debeScroll) {
      this.scrollAlFinal();
      this.debeScroll = false;
    }
  }
 
  // ── Carga inicial ───────────────────────────────────────────────────────────
 
  private cargarMensajes(): void {
    this.mensajes.set([]);
    this.mensajeService.getMensajes(this.conversacionId, { size: 50 }).subscribe({
      next: (pagina) => {
        this.mensajes.set(pagina.content);
        this.debeScroll = true;
      },
    });
  }
 
  // ── Envío ────────────────────────────────────────────────────────────────────
 
  enviar(): void {
    const textoTrimado = this.texto.trim();
    if (!textoTrimado || this.cargando()) return;
 
    // Mensaje optimista del usuario (tipo PREGUNTA)
    const mensajeUsuario: MensajeDTO = {
      id: -Date.now(),          // id temporal negativo hasta que llegue la respuesta
      conversacionId: this.conversacionId,
      tipo: 'PREGUNTA',
      contenido: textoTrimado,
      fecha: new Date().toISOString(),
    };
    this.mensajes.update(msgs => [...msgs, mensajeUsuario]);
    this.texto = '';
    this.debeScroll = true;
    this.resetInputAltura();
 
    // El backend devuelve solo la RESPUESTA (MensajeDTO tipo RESPUESTA)
    this.mensajeService.enviarPregunta(this.conversacionId, textoTrimado).subscribe({
      next: (respuesta) => {
        this.mensajes.update(msgs => [...msgs, respuesta]);
        this.debeScroll = true;
      },
      error: () => {
        const error: MensajeDTO = {
          id: -Date.now(),
          conversacionId: this.conversacionId,
          tipo: 'RESPUESTA',
          contenido: '⚠️ Error al obtener respuesta. Inténtalo de nuevo.',
          fecha: new Date().toISOString(),
        };
        this.mensajes.update(msgs => [...msgs, error]);
        this.debeScroll = true;
      },
    });
  }
 
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.enviar();
    }
  }
 
  autoResize(): void {
    const el = this.inputRef?.nativeElement;
    if (!el) return;
    el.style.height = 'auto';                                   // reset para recalcular
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';   // máx ~6 líneas
  }
 
  private resetInputAltura(): void {
    const el = this.inputRef?.nativeElement;
    if (el) el.style.height = 'auto';
  }
 
  // ── Scroll ───────────────────────────────────────────────────────────────────
 
  private scrollAlFinal(): void {
    try {
      const el = this.mensajesRef.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch { /* ignore */ }
  }
 
  trackById(_: number, msg: MensajeDTO): number {
    return msg.id;
  }
}