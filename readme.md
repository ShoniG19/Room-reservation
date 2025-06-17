# 🏨 Sistema de Reservas de Hotel

Sistema completo de gestión y reservas de habitaciones de hotel desarrollado con tecnologías modernas. Incluye administración de hoteles, habitaciones, clientes y reservas con una interfaz intuitiva y visualización de planos.

## ✨ Características Principales

### 🎯 Funcionalidades Core
- **Gestión de Hoteles**: CRUD completo para administración de hoteles
- **Gestión de Habitaciones**: Administración con coordenadas y características
- **Gestión de Clientes**: Registro y búsqueda por cédula
- **Sistema de Reservas**: Reserva de habitaciones con validaciones
- **Listado de Reservas**: Filtros avanzados y paginación

### 🗺️ Características Avanzadas
- **Visualización de Planos**: Mapa interactivo de habitaciones por piso
- **Estados de Habitaciones**: Disponible, ocupada, reservada, mantenimiento
- **Filtros en Tiempo Real**: Por hotel, fechas y cliente
- **Paginación**: En listados y búsquedas
- **Validaciones**: Fechas, capacidad y disponibilidad

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Framework principal
- **React Router** - Navegación
- **Tailwind CSS** - Estilos y diseño responsive
- **Axios** - Comunicación con API
- **React Hot Toast** - Notificaciones
- **Headless UI** - Componentes accesibles
- **Lucide React** - Iconografía

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Sequelize** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **CORS** - Configuración de CORS

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL
- npm o yarn

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/ShoniG19/Room-reservation.git
cd Room-reservation
```
### 2. Configurar Backend
```bash
cd Backend
npm install
```
#### Configurar Base de Datos:
Crear base de datos PostgreSQL llamada hotelReserva
Actualizar credenciales en app/config/db.config.js

```bash
# Ejecutar migraciones
npx sequelize-cli db:migrate

# Iniciar servidor
npm start
```

### 3. Configurar Frontend
```bash
cd Frontend
npm install
npm start
```

## 📁 Estructura del Proyecto
```
├── Backend/
│   ├── app/
│   │   ├── config/          # Configuración de BD
│   │   ├── controllers/     # Controladores de API
│   │   ├── models/          # Modelos Sequelize
│   │   ├── routes/          # Rutas de API
│   │   ├── migrations/      # Migraciones de BD
│   │   └── utils/           # Utilidades
│   └── server.js            # Servidor principal
│
└── Frontend/hotelapp/
    ├── src/
    │   ├── components/      # Componentes React
    │   ├── pages/           # Páginas principales
    │   ├── api/             # Servicios de API
    │   └── utils/           # Utilidades
    └── public/              # Archivos estáticos
```

## 🎮 Funcionalidades Detalladas
### 🏨 Módulo de Reservas
- Búsqueda por fechas y capacidad
- Selección de hotel opcional
- Validación de disponibilidad
- Gestión automática de clientes
- Confirmación con resumen
### 📋 Listado de Reservas
- Filtros por hotel, fechas y cliente
- Paginación configurable (5, 10, 25 elementos)
- Ordenamiento automático
- Información completa de reserva
### 🗺️ Visualización de Planos
- Selección de hotel y piso
- Estados visuales por colores
- Zoom y arrastre del mapa
- Detalles de habitación
- Acceso directo a reserva

## Screenshots
![Vista principal de la app](https://res.cloudinary.com/dcfsbzb0d/image/upload/v1750182458/Captura_de_pantalla_2025-06-17_141738_rmtmnk.png)
![Vista de la reservacion](https://res.cloudinary.com/dcfsbzb0d/image/upload/v1750182458/Captura_de_pantalla_2025-06-17_141856_df3r2t.png)
![Vista del listado](https://res.cloudinary.com/dcfsbzb0d/image/upload/v1750182458/Captura_de_pantalla_2025-06-17_141934_mpzyw9.png)
![Vista del mapa](https://res.cloudinary.com/dcfsbzb0d/image/upload/v1750182458/Captura_de_pantalla_2025-06-17_142006_sj96ae.png)

## 📧 Contacto
Hecho por @[ShoniG19](https://github.com/ShoniG19)
