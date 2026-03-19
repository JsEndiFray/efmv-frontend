# EFMV · Frontend

Portfolio web personal desarrollado con Angular 18. Presenta perfil profesional, experiencia laboral, habilidades técnicas, formación académica y un formulario de contacto integrado con la API REST.

**Desplegado en Vercel · [efmv.es](https://www.efmv.es)**

---

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 18.2 | Framework principal (standalone components) |
| TypeScript | 5.5 | Lenguaje — tipado estricto, sin `any` explícito |
| RxJS | 7.8 | Gestión de observables y flujos asíncronos |
| SweetAlert2 | 11.x | Modales y notificaciones de usuario |
| Markmap | 0.18 | Visualización de mapas mentales (lazy loaded) |

---

## Rutas

| Ruta | Página | Carga |
|---|---|---|
| `/dashboard` | Carta de presentación | Eager |
| `/formation` | Formación académica | Eager |
| `/skills` | Habilidades técnicas | Eager |
| `/work` | Experiencia laboral + descarga de CV | Eager |
| `/contact` | Formulario de contacto | Eager |
| `/project` | Proyectos | Eager |
| `/project-map` | Mapa mental de proyectos | **Lazy** |

`/project-map` carga `markmap-lib` (~670 kb) únicamente al navegar a esa ruta, sin impacto en el bundle inicial.

---

## Arquitectura

```
src/app/
├── core/
│   ├── data/                   # Datos estáticos tipados (formación, skills, experiencia)
│   ├── error-handler/          # Manejo centralizado de errores HTTP
│   └── services/
│       ├── api-services/       # Capa base HTTP (ApiServices)
│       ├── contact-services/   # ContactApiService — envío y validación del formulario
│       ├── cv-service/         # CvService — descarga y estado del CV
│       ├── formation-services/ # FormationService — datos de formación
│       ├── kills-services/     # KillsServices — habilidades técnicas
│       └── work-services/      # WorkService — experiencia laboral
├── interface/                  # Interfaces TypeScript para todos los modelos
├── pages/                      # Componentes de página (standalone)
│   ├── dashboard/
│   ├── formation/
│   ├── skills/
│   ├── work/
│   ├── contact/
│   ├── project/
│   └── project-map/            # Lazy loaded
└── shared/
    ├── header/
    └── footer/
```

**Flujo de una petición de contacto:**

```
ContactComponent
  → ContactApiService.validateForm()   # Validación client-side
  → ContactApiService.sendEmail()
      → ApiServices.post()             # HTTP POST con environment correcto
          → ErrorHandlerService        # Manejo centralizado de errores HTTP
```

---

## Entornos

| Archivo | Contexto | API URL |
|---|---|---|
| `environment.development.ts` | Desarrollo local | `http://localhost:5001` |
| `environment.ts` | Producción | `https://api.efmv.es` |

Angular sustituye automáticamente el entorno en el build de producción mediante `fileReplacements` en `angular.json`.

---

## Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm start           # ng serve → http://localhost:4200

# Build de producción
npm run build       # ng build --configuration production
```

---

## Seguridad

| Medida | Implementación |
|---|---|
| Sin dependencias CDN | Todas las librerías gestionadas vía npm — sin scripts externos |
| Tipado estricto | Sin `any` explícito en todo el proyecto |
| Logs controlados | `console.error/log` solo activos bajo `!environment.production` |
| Sin bypasses Angular | Sin `innerHTML`, `DomSanitizer.bypassSecurityTrust*` ni `eval` |
| Entorno correcto en producción | Import de `environment` validado — `fileReplacements` verificado en bundle |

---

## Principios aplicados

- **Standalone components** — sin NgModules, estructura modular y tree-shakeable
- **Tipado completo** — interfaces definidas para todos los modelos de datos, sin `any`
- **Unsubscribe pattern** — `takeUntil(destroy$)` en todos los componentes con subscripciones
- **Lazy loading estratégico** — `markmap-lib` aislado en su ruta, sin impacto en carga inicial
- **Control flow moderno** — `@if`, `@for` nativos de Angular 17+ en todos los templates
- **Separación de responsabilidades** — datos, lógica HTTP y presentación en capas independientes

---

## Estado actual

- [x] Portfolio completo con todas las secciones navegables
- [x] Formulario de contacto funcional con validación client-side
- [x] Descarga de CV desde la API con feedback visual
- [x] Visualización de mapa mental de proyectos (lazy loaded)
- [x] Tipado estricto — sin `any` en todo el proyecto
- [x] Sin dependencias CDN externas
- [x] Build de producción apunta a API correcta (`api.efmv.es`)
- [x] Bundle inicial por debajo de 480 kb raw

---

## Autor

**Endi Fray** · [efmv.es](https://www.efmv.es) · [endifray@efmv.es](mailto:endifray@efmv.es)
