# 📋 Workspace — Gestor de Tareas y Productividad

Aplicación web SPA para la gestión de tareas de equipo. Permite crear, editar, eliminar y filtrar tareas por estado, con autenticación simulada vía LocalStorage y persistencia de datos en una API REST mockeada con JSON Server.

---

## 🚀 Demo en producción

| Servicio | URL |
|----------|-----|
| Frontend | `https://<tu-proyecto-frontend>.up.railway.app` |
| API (JSON Server) | `https://<tu-proyecto-api>.up.railway.app` |

> Reemplaza las URLs con las generadas por Railway tras el despliegue.

---

## 🛠️ Stack tecnológico

| Herramienta | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 19 | Framework de UI |
| [Vite](https://vitejs.dev/) | 8 | Bundler y servidor de desarrollo |
| [React Router DOM](https://reactrouter.com/) | 7 | Enrutamiento SPA y rutas protegidas |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos utilitarios |
| [SweetAlert2](https://sweetalert2.github.io/) | 11 | Alertas y confirmaciones |
| [JSON Server](https://github.com/typicode/json-server) | 1.0 beta | API REST mockeada |
| [Concurrently](https://github.com/open-cli-tools/concurrently) | 9 | Ejecución paralela de scripts |

### API mockeada

La API REST es servida por **JSON Server** a partir del archivo `backend/db.json`.  
Endpoint base: `http://localhost:3001` (local) o la URL pública de Railway (producción).

| Recurso | Endpoint |
|---------|----------|
| Tareas | `/tareas` |

La variable de entorno `VITE_API_URL` controla la URL base de la API. Si no se define, el frontend apunta a `http://localhost:3001` por defecto.

---

## 📂 Estructura del proyecto

```
task-manager/
├── backend/
│   └── db.json              # Base de datos de JSON Server
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Imágenes y recursos estáticos
│   ├── components/
│   │   ├── Sidebar.jsx      # Barra lateral de navegación
│   │   └── Sidebar.css
│   ├── helpers/
│   │   ├── alerts.js        # Utilidades de SweetAlert2
│   │   └── local-storage.js # Helpers para sesión en LocalStorage
│   ├── pages/
│   │   ├── Login.jsx        # Página de inicio de sesión
│   │   ├── Dashboard.jsx    # Layout principal con Sidebar
│   │   ├── Board.jsx        # Tablero Kanban de tareas
│   │   ├── TaskCreate.jsx   # Formulario para crear tarea
│   │   └── TaskEdit.jsx     # Formulario para editar tarea
│   ├── routes/
│   │   └── routerApp.jsx    # Configuración de rutas (incluyendo rutas protegidas)
│   ├── services/
│   │   └── api.js           # Capa de comunicación con la API
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## ⚙️ Instalación y ejecución local

### Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

### 1. Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario>/task-manager.git
cd task-manager
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar frontend y backend simultáneamente

```bash
npm run dev:full
```

Este comando levanta en paralelo:

- **JSON Server** → `http://localhost:3001` (API REST, datos en `backend/db.json`)
- **Vite dev server** → `http://localhost:5173` (Frontend)

### 4. O ejecutar cada servicio por separado (dos terminales)

```bash
# Terminal 1 — API REST
npm run server

# Terminal 2 — Frontend
npm run dev
```

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `npm run server` | Inicia JSON Server en el puerto 3001 |
| `npm run dev:full` | Inicia ambos servicios en paralelo |
| `npm run build` | Genera la build de producción en `/dist` |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint |

---

## ☁️ Despliegue en Railway

El proyecto se despliega en dos servicios independientes dentro del mismo repositorio en [Railway](https://railway.com/).

### Requisitos previos

- Cuenta en [railway.com](https://railway.com/)
- Repositorio subido a GitHub

---

### Servicio 1 — Backend (JSON Server)

1. En el dashboard de Railway, haz clic en **New Project → Deploy from GitHub repo** y selecciona este repositorio.
2. Ve a **Settings** del servicio y en el campo **Start Command** escribe:
   ```
   npm run server
   ```
3. En **Variables**, agrega:
   ```
   PORT=3001
   ```
4. Haz clic en **Deploy**. Railway generará una URL pública, por ejemplo:
   ```
   https://task-manager-api-production.up.railway.app
   ```
5. Copia esa URL, la necesitarás para el frontend.

---

### Servicio 2 — Frontend (React + Vite)

1. Dentro del mismo proyecto de Railway, haz clic en **New Service → GitHub Repo** y selecciona el mismo repositorio.
2. Ve a **Settings** del servicio y en el campo **Build Command** escribe:
   ```
   npm run build
   ```
   Y en **Start Command**:
   ```
   npx serve dist -p $PORT
   ```
3. En **Variables**, agrega la URL del backend que copiaste en el paso anterior:
   ```
   VITE_API_URL=https://task-manager-api-production.up.railway.app
   ```
   > **Importante:** La variable debe comenzar con `VITE_` para que Vite la inyecte correctamente en tiempo de build.
4. Haz clic en **Deploy**. Railway generará la URL pública del frontend, por ejemplo:
   ```
   https://task-manager-frontend-production.up.railway.app
   ```

---

## 🔄 Flujo de uso

1. Accede a la URL del frontend → pantalla de **Login**
2. Ingresa tu nombre y selecciona tu departamento → los datos se guardan en LocalStorage
3. Eres redirigido al **Dashboard / Tablero** con todas las tareas
4. Desde el tablero puedes:
   - **Crear** nuevas tareas con título, descripción y fecha de vencimiento
   - **Editar** tareas existentes
   - **Eliminar** tareas con confirmación
   - **Filtrar** tareas por estado (Pendiente, En Progreso, Completada)
5. El botón **Cerrar sesión** limpia la sesión del LocalStorage y regresa al Login

---

## 🌐 Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base de la API REST | `http://localhost:3001` |
| `PORT` | Puerto del servidor (usado por Railway) | `3001` (backend) |

---

## 📄 Licencia

MIT - la licencia MIT, licencia open source más común. Básicamente que cualquiera puede usar, copiar, modificar y distribuir el código libremente.