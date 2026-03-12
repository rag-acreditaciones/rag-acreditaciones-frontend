import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentoService } from '../documento.service';
import { Documento, DocumentoPreview } from '../documento.model';

@Component({
  selector: 'app-documento-visor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documento-visor.component.html',
  styleUrls: ['./documento-visor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoVisorComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly documentoService = inject(DocumentoService);
  private readonly sanitizer = inject(DomSanitizer);

  documento = signal<Documento | null>(null);
  pdfUrl = signal<SafeResourceUrl | null>(null);
  cargandoDocumento = signal(false);
  cargandoPDF = signal(false);
  errorDocumento = signal<string | null>(null);
  errorPDF = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDocumento(parseInt(id, 10));
      this.cargarPDF(parseInt(id, 10));
    } else {
      this.errorDocumento.set('ID de documento no válido');
    }
  }

  private cargarDocumento(id: number): void {
    this.cargandoDocumento.set(true);
    this.errorDocumento.set(null);

    this.documentoService.getDocumento(id).subscribe({
      next: (doc) => {
        this.documento.set(doc);
        this.cargandoDocumento.set(false);
      },
      error: (error) => {
        this.errorDocumento.set('Error al cargar los metadatos del documento');
        this.cargandoDocumento.set(false);
        console.error('Error cargando documento:', error);
      },
    });
  }

  private cargarPDF(id: number): void {
    this.cargandoPDF.set(true);
    this.errorPDF.set(null);

    this.documentoService.previewDocumento(id).subscribe({
      next: (preview) => {
        // Convertir base64 a blob
        const byteCharacters = atob(preview.base64Contenido);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: preview.contentType });

        //hacer url segura del blob
        const blobUrl = URL.createObjectURL(blob);
        this.pdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
        this.cargandoPDF.set(false);
      },
      error: (error) => {
        this.errorPDF.set('Error al cargar la vista previa del PDF');
        this.cargandoPDF.set(false);
        console.error('Error cargando PDF:', error);
      },
    });
  }

  descargarPDF(): void {
    const doc = this.documento();
    if (!doc) return;

    const id = doc.id;
    this.documentoService.downloadDocumento(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = doc.nombreFichero || `documento-${id}.pdf`;
        enlace.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error descargando PDF:', error);
        this.errorDocumento.set('Error al descargar el PDF');
      },
    });
  }

  verChunksDocumento(): void {
    const doc = this.documento();
    if (!doc) {
      return;
    }

    this.router.navigate(['/chunks', doc.id]);
  }

  volverAtras(): void {
    this.router.navigate(['/documentos']);
  }
}
