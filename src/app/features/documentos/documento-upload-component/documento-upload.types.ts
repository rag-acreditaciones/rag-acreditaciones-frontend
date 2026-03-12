//En este fichero aprovechamos para tener la interfaz y a la vez la config de caracteristicas del documento.

import { DocumentoUploadMetadata } from '../documento.model';

//interface del modal Documento -> extiende DocumentoUploadMetadata
export interface DatosDocumento extends Omit<DocumentoUploadMetadata, 'seccionTematicaId'> {
  seccionTematicaId: number | null;  // Sobrescribe con null para el formulario
  archivoSeleccionado: File | null;   //añade otro campo que necesitamos para poder trabajar
}


//--------------------------------------------------------------------------------------------------------------------


//Esta parte es la de las caracteristicas del documento a subir 
export const DOCUMENTO_CONFIG = {
  validacion: {
    descripcionMinChars: 10,
    tamaño: {
      maxMB: 50,
      maxBytes: 50 * 1024 * 1024,
    },
    tipo: 'application/pdf',
  },
} as const;
