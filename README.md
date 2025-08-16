# Angular Frontend para Microservicios (API Gateway)

Este es un proyecto básico desarrollado con **Angular 19**, diseñado para consumir servicios expuestos por un back-end basado en microservicios centralizados mediante un **API Gateway** creado manualmente con **Node.js**.

🔗 Repositorio del back-end: [api-gateway-micro-services](https://github.com/bpabon/api-gateway-micro-services)

## ✨ Características Principales

- 🔗 **Consumo de servicios REST y WebSockets**
- 🧠 **Intercepción automática de tokens JWT** mediante interceptores
- 🔁 **Reintentos automáticos** en peticiones HTTP fallidas (hasta 3 intentos)
- 🛡️ **Protección de rutas** con Guards para rutas públicas y privadas
- 🔐 **Autenticación completa**:
  - Login
  - Registro de usuarios
  - Actualización de contraseña mediante token por URL
  - Vista para restablecer contraseña
- 🌗 **Modo claro y oscuro**, con cambios de color personalizables
- 📱 **Diseño completamente responsive**
- 💾 **Uso de LocalStorage** para almacenar el JWT
- 🚀 **Preparado para despliegue en Netlify**
- 🎨 **UI moderna** con integración de [Tailwind CSS](https://tailwindcss.com/)
- 💬 **Componente de chat básico** utilizando WebSockets
- 📊 **Componente de tabla interactiva** para visualizar datos

## ⚙️ Tecnologías Utilizadas

- **Angular 19**
- **Tailwind CSS**
- **Node.js** (para el backend)
- **WebSockets**
- **JWT**
- **LocalStorage**
- **Netlify**

## 📡 Funcionalidad del Proyecto

Este frontend establece una comunicación básica con el backend mediante:

### HTTP

- Se realizan llamadas HTTP autenticadas utilizando un token JWT almacenado en `localStorage`.
- Las peticiones fallidas se reintentan automáticamente hasta 3 veces usando un interceptor personalizado.

### WebSockets

- Se establece una conexión de socket básica.
- Emite mensajes a través de la conexión.
- La implementación actual es funcional pero **requiere mejoras para una gestión óptima** (como manejo de reconexión, cierre limpio, etc.).

## 🔐 Sistema de Autenticación

Incluye un flujo completo de autenticación con funcionalidades clave:

- **Login**: ingreso con verificación de JWT.
- **Registro**: creación de nuevos usuarios.
- **Protección de rutas**: mediante `canActivate` se restringe el acceso a vistas privadas solo a usuarios autenticados.
- **Recuperación de contraseña**:
  - Vista para solicitar restablecimiento de contraseña.
  - Enlace enviado por correo con token para establecer nueva contraseña.
  - Vista protegida para cambio de contraseña mediante token en URL.

## 🧩 Componentes Principales

### 🗨️ Vista de Chat

- Componente que establece conexión WebSocket con el backend.
- Permite enviar mensajes al servidor y visualizarlos en tiempo real.

### 📋 Vista de Tabla Interactiva

- Componente que muestra datos en una tabla dinámica.
- Incluye ordenamiento, paginación y visualización responsiva.

## 🧪 Estado del Proyecto

> Este es un proyecto de base para explorar la arquitectura de microservicios y el uso de API Gateways. No está pensado aún como un producto final, sino como una prueba de concepto en evolución.

## 🚀 Despliegue

El proyecto está **preparado para ser desplegado en Netlify**. Simplemente realiza un push a tu repositorio conectado y Netlify se encargará del resto.

## 🛠️ Instalación y Ejecución

1. Clona el repositorio:
  ```bash
   git clone https://github.com/bpabon/chats-micro-services.git
   cd chats-micro-services
  ```
2. Instala las dependencias:
  ```bash
   npm install
  ```
3. Inicia el servidor de desarrollo::
  ```bash
   ng serve
  ```

##  📌 Consideraciones
- El token JWT se almacena de forma local para persistencia de sesión.
- Se recomienda implementar mejoras de seguridad para producción (manejo de errores más avanzado).
- La conexión por socket debe optimizarse para manejo de reconexiones, cierre limpio y manejo de errores entre otras. 

## 🧑‍💻 Autor
- Desarrollado por [bpabon](https://github.com/bpabon).
