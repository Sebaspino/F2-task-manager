# Workspace — Gestor de Tareas y Productividad

Aplicación web SPA para gestionar tareas de equipo. Permite crear, editar, eliminar y filtrar tareas por estado, con autenticación simulada vía LocalStorage y persistencia de datos en una API REST con JSON Server.

---

## Stack tecnológico

| Herramienta | Uso |
|---|---|
| React 19 + Vite 8 | Framework y bundler |
| react-router-dom v7 | Enrutamiento y rutas protegidas |
| Tailwind CSS v4 | Estilos |
| SweetAlert2 | Alertas y confirmaciones |
| LocalStorage | Persistencia de sesión (simulada) |
| JSON Server | API REST mockeada (`backend/db.json`) |

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/task-manager.git
cd task-manager
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar frontend + backend juntos

```bash
npm run dev:full
```

Esto levanta simultáneamente:
- **JSON Server** en `http://localhost:3001` (datos en `backend/db.json`)
- **Vite** en `http://localhost:5173`

O por separado en dos terminales:

```bash
# Terminal 1 — API
npm run server

# Terminal 2 — Frontend
npm run dev
```

---

## Deploy en producción

### Backend (JSON Server) → Railway

1. Entra a [railway.app](https://railway.app) → New Project → Deploy from GitHub repo
2. En **Settings → Start Command** escribe: `npm run server`
3. Railway generará una URL pública (ej: `https://task-manager-api.up.railway.app`)

### Frontend → Vercel

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. En **Environment Variables** agrega:
   - `VITE_API_URL` = URL pública de Railway
3. Deploy

---

## Flujo de uso

1. Accede a `/` — ingresa tu nombre y selecciona tu departamento
2. Serás redirigido al tablero `/dashboard`
3. Crea, edita, filtra y elimina tareas desde el tablero
4. El botón "Cerrar sesión" limpia la sesión y retorna al login

---

## Demo

- Frontend: **[URL de Vercel]**
- API: **[URL de Railway]**