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
        email: 'alumno1@example.com',
        nombre: 'Alumno1',
        docsSubidos: 12,
        conversaciones: 8,
        total: 20
    },
    {
        email: 'alumno3@example.com',
        nombre: 'Alumno3',
        docsSubidos: 10,
        conversaciones: 12,
        total: 22
    },
    {
        email: 'alumno2@example.com',
        nombre: 'Alumno2',
        docsSubidos: 8,
        conversaciones: 6,
        total: 14
    },
    {
        email: 'profesor@example.com',
        nombre: 'Prof.López',
        docsSubidos: 15,
        conversaciones: 2,
        total: 17
    },
    {
        email: 'alumno4@example.com',
        nombre: 'Alumno4',
        docsSubidos: 1,
        conversaciones: 2,
        total: 3
    },
    {
        email: 'alumno5@example.com',
        nombre: 'Alumno5',
        docsSubidos: 1,
        conversaciones: 1,
        total: 2
    },
    {
        email: 'alumno6@example.com',
        nombre: 'Alumno6',
        docsSubidos: 0,
        conversaciones: 1,
        total: 1
    },
    {
        email: 'alumno7@example.com',
        nombre: 'Alumno7',
        docsSubidos: 0,
        conversaciones: 0,
        total: 0
    },
];

export const usuariosRolDemoData: CantidadesPorEtiqueta[] = [
  { etiqueta: 'ADMIN', cantidad: 3 },
  { etiqueta: 'USER', cantidad: 15 }
];