import { Component, OnInit, inject } from '@angular/core';
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
})
export class DocumentoVisorComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly documentoService = inject(DocumentoService);
  private readonly sanitizer = inject(DomSanitizer);

  documento: Documento | null = null;
  pdfUrl: SafeResourceUrl | null = null;
  cargandoDocumento = false;
  cargandoPDF = false;
  errorDocumento: string | null = null;
  errorPDF: string | null = null;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDocumento(parseInt(id, 10));
      this.cargarPDF(parseInt(id, 10));
    } else {
      this.errorDocumento = 'ID de documento no válido';
    }
  }

  private cargarDocumento(id: number): void {
    this.cargandoDocumento = true;
    this.errorDocumento = null;

    this.documentoService.getDocumento(id).subscribe({
      next: (doc) => {
        this.documento = doc;
        this.cargandoDocumento = false;
      },
      error: (error) => {
        this.errorDocumento = 'Error al cargar los metadatos del documento';
        this.cargandoDocumento = false;
        console.error('Error cargando documento:', error);
      },
    });
  }

  private cargarPDF(id: number): void {
    this.cargandoPDF = true;
    this.errorPDF = null;

    this.documentoService.previewDocumento(id).subscribe({
      next: (preview) => {
        // Convertir base64 a blob
        const byteCharacters = atob(preview.base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: preview.contentType });

        // Crear URL segura del blob
        const blobUrl = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        this.cargandoPDF = false;
      },
      error: (error) => {
        this.errorPDF = 'Error al cargar la vista previa del PDF';
        this.cargandoPDF = false;
        console.error('Error cargando PDF:', error);
      },
    });
  }

  volverAtras(): void {
    this.router.navigate(['/documentos']);
  }
}
