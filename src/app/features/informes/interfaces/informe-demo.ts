import { ActividadDiaria, ActividadReciente, CantidadesPorEtiqueta, Evolucion, HorasPunta, InformeTotal, UsuarioRanking } from "./informe.model";

export const actividadDiariaDemoData: ActividadDiaria[] = [
  { fecha: '2026-03-04', preguntas: 20 },
  { fecha: '2026-03-05', preguntas: 35 },
  { fecha: '2026-03-06', preguntas: 28 },
  { fecha: '2026-03-07', preguntas: 42 },
  { fecha: '2026-03-08', preguntas: 31 },
  { fecha: '2026-03-09', preguntas: 15 },
  { fecha: '2026-03-10', preguntas: 12 },
];

export const actividadRecienteDemoData: ActividadReciente[] = [
    {
        usuario: 'Alumno3',
        accion: 'SUBIDA_DOCUMENTO',
        recurso: 'modelo1',
        fecha: '2026-03-11'
    },
    {
        usuario: 'Alumno1',
        accion: 'PREGUNTA_RAG',
        recurso: 'modelo2',
        fecha: '2026-03-11'
    },
    {
        usuario: 'Alumno2',
        accion: 'VALORACION',
        recurso: 'modelo3',
        fecha: '2026-03-10'
    },
    {
        usuario: 'Alumno3',
        accion: 'REPORTE',
        recurso: 'modelo4',
        fecha: '2026-03-9'
    },
    {
        usuario: 'Alumno2',
        accion: 'VALORACION',
        recurso: 'modelo5',
        fecha: '2026-03-8'
    },
    {
        usuario: 'Alumno3',
        accion: 'SUBIDA_DOCUMENTO',
        recurso: 'modelo1',
        fecha: '2026-03-11'
    },
    {
        usuario: 'Alumno1',
        accion: 'PREGUNTA_RAG',
        recurso: 'modelo2',
        fecha: '2026-03-11'
    },
    {
        usuario: 'Alumno2',
        accion: 'VALORACION',
        recurso: 'modelo3',
        fecha: '2026-03-10'
    }
];

export const chatsSeccionDemoData: CantidadesPorEtiqueta[] = [
    {
        etiqueta: 'BD',
        cantidad: 15
    },
    {
        etiqueta: 'WEB',
        cantidad: 5
    },
    {
        etiqueta: 'Programación',
        cantidad: 3
    },
    {
        etiqueta: 'General',
        cantidad: 40
    }
];

export const documentosEstadoDemoData: CantidadesPorEtiqueta[] = [
    {
        etiqueta: 'PENDIENTE',
        cantidad: 13
    },
    {
        etiqueta: 'PROCESANDO',
        cantidad: 7
    },
    {
        etiqueta: 'PROCESADO',
        cantidad: 12
    },
    {
        etiqueta: 'ERROR',
        cantidad: 25
    },
    {
        etiqueta: 'ELIMINADO',
        cantidad: 17
    }
];

export const documentosSeccionDemoData: CantidadesPorEtiqueta[] = [
    {
        etiqueta: 'BD',
        cantidad: 12
    },
    {
        etiqueta: 'WEB',
        cantidad: 9
    },
    {
        etiqueta: 'Programación',
        cantidad: 8
    },
    {
        etiqueta: 'General',
        cantidad: 25
    }
];

export const evolucionDemoData: Evolucion[] = [
    {
        periodo: '2026-01-01',
        count: 12
    },
    {
        periodo: '2026-01-02',
        count: 9
    },
    {
        periodo: '2026-01-03',
        count: 8
    },
    {
        periodo: '2026-01-04',
        count: 25
    },
    {
        periodo: '2026-01-05',
        count: 14
    },
    {
        periodo: '2026-01-06',
        count: 16
    },
    {
        periodo: '2026-01-07',
        count: 10
    }
];

export const horaPuntaDemoData: HorasPunta[] = [
  { hora: 0,  preguntas: 5  },
  { hora: 1,  preguntas: 8  },
  { hora: 2,  preguntas: 3  },
  { hora: 3,  preguntas: 1  },
  { hora: 4,  preguntas: 2  },
  { hora: 5,  preguntas: 4  },
  { hora: 6,  preguntas: 9  },
  { hora: 7,  preguntas: 18 },
  { hora: 8,  preguntas: 35 },
  { hora: 9,  preguntas: 52 },
  { hora: 10, preguntas: 48 },
  { hora: 11, preguntas: 43 },
  { hora: 12, preguntas: 30 },
  { hora: 13, preguntas: 25 },
  { hora: 14, preguntas: 38 },
  { hora: 15, preguntas: 55 },
  { hora: 16, preguntas: 62 },
  { hora: 17, preguntas: 45 },
  { hora: 18, preguntas: 28 },
  { hora: 19, preguntas: 20 },
  { hora: 20, preguntas: 15 },
  { hora: 21, preguntas: 12 },
  { hora: 22, preguntas: 9  },
  { hora: 23, preguntas: 6  },
];

export const informeTotalDemoData: InformeTotal = {
    totalDocumentos: 14,
    totalChunks: 30,
    totalConversaciones: 47,
    totalPreguntas: 133,
    totalUsuarios: 3,
    ratioCalidad: 87
};

export const rankingUsuariosDemoData: UsuarioRanking[] = [
    {
        usuarioId: 1,
        nombre: 'Alumno1',
        numDocumentos: 12,
        numConversaciones: 8
    },
    {
        usuarioId: 3,
        nombre: 'Alumno3',
        numDocumentos: 10,
        numConversaciones: 12
    },
    {
        usuarioId: 2,
        nombre: 'Alumno2',
        numDocumentos: 8,
        numConversaciones: 6
    },
    {
        usuarioId: 0,
        nombre: 'Prof.López',
        numDocumentos: 15,
        numConversaciones: 2
    },
    {
        usuarioId: 4,
        nombre: 'Alumno4',
        numDocumentos: 1,
        numConversaciones: 2
    },
    {
        usuarioId: 5,
        nombre: 'Alumno5',
        numDocumentos: 1,
        numConversaciones: 1
    },
    {
        usuarioId: 6,
        nombre: 'Alumno6',
        numDocumentos: 0,
        numConversaciones: 1
    },
    {
        usuarioId: 7,
        nombre: 'Alumno7',
        numDocumentos: 0,
        numConversaciones: 0
    },
];

export const usuariosRolDemoData: CantidadesPorEtiqueta[] = [
  { etiqueta: 'ADMIN', cantidad: 3 },
  { etiqueta: 'USER', cantidad: 15 }
];