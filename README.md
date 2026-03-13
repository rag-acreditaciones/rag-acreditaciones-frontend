# RAG Acreditaciones - Frontend (Angular)

Este es el frontend del proyecto **RAG Acreditaciones**, una Single Page Application (SPA) desarrollada con **Angular 21**. Proporciona la interfaz de usuario para interactuar con el sistema de acreditaciones, gestión de documentos con IA (RAG) y visualización de PDFs y métricas.

## 🛠️ Tecnologías Principales

- **Angular 21**
- **TypeScript**
- **Bootstrap 5 & Bootstrap Icons**: Para el diseño responsivo, la maquetación y la iconografía.
- **Chart.js & ng2-charts**: Para la visualización gráfica de datos e informes.
- **ng2-pdf-viewer**: Para la previsualización nativa de documentos PDF dentro del navegador.
- **RxJS**: Gestión de flujos de datos asíncronos.

## 🚀 Requisitos Previos

- **Node.js** (Se recomienda LTS reciente).
- **npm** (El proyecto tiene fijado `npm@11.10.0` en su configuración).
- *Opcional:* Angular CLI instalado globalmente (`npm i -g @angular/cli`).

## 📦 Instalación

1. Abre una terminal en la carpeta raíz del frontend (`rag-acreditaciones-frontend`).
2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## ▶️ Servidor de Desarrollo

Para arrancar la aplicación en entorno de desarrollo, ejecuta:

```bash
npm start
```
*(Este comando ejecuta `ng serve` por debajo).*

Abre tu navegador y navega a **http://localhost:4200/**. La aplicación se recargará automáticamente si realizas cambios en el código fuente.

**Nota importante:** Asegúrate de que el **Backend (Spring Boot)** está en ejecución para que la aplicación pueda consumir los datos a través de la API REST.

## 🏗️ Construcción (Build)

Para compilar el proyecto para producción, ejecuta:

```bash
npm run build
```

Los archivos compilados (artefactos) se generarán en el directorio de salida (por defecto en `dist/rag-acreditaciones-frontend/`). Estos son los archivos estáticos que deben servirse mediante un servidor web como Nginx, Apache o Tomcat.

## 🧪 Pruebas (Testing)

El proyecto está configurado para ejecutar pruebas unitarias. Puedes lanzarlas con:

```bash
npm test
```
*(Utiliza Vitest según la configuración del entorno Angular).*

## UI 

