# A un clic de tu vida profesional

Portal educativo de Karen Ariadna Guzmán Vega, ME. (Mentoría y Bienestar, LiFE, Tecnológico de Monterrey).

GitHub Pages publica únicamente `docs/` desde la rama `main`.

- `docs/index.html`: página de inicio.
- `docs/innermetrix/index.html`: exploración del reporte (edición pública con esquema de ubicación propio).
- `docs/plan-estrategico/index.html`: versión vigente del plan estratégico.
- `docs/assets/`: fuentes y licencia tipográfica.

No incluye reportes personales, respuestas de estudiantes, borradores ni archivos históricos. Las actividades guardan respuestas en el navegador. No existe recepción automática ni envío a Canvas. El cambio de dominio no migra respuestas guardadas en otros sitios.

Los créditos y permisos particulares se encuentran dentro de cada actividad. La licencia tipográfica se limita a los archivos de fuentes.

Para actualizar, editar los archivos de `docs/` y publicar un commit en `main`. Revisar enlaces relativos y la exportación PDF después de cambios funcionales. El recurso Innermetrix de autoría local conserva su captura original; esta edición pública usa un esquema propio.

## Assessment Lab

Módulo público en `docs/assessment-lab/` con siete casos AD26, propuesta de equipo, evaluación individual, reportes HTML descargables y referencias de reclutamiento. Respuestas en memoria; guardado local opcional. No hay backend, autenticación, sincronización ni recepción de entregas.

Fuentes editoriales en `content/assessment-lab/`: `REGLAS_ASSESSMENT_LAB.md`, `casos-ad26.md`, `instrucciones.md`, `rubrica.json` y `sesion-ad26.json`. Las asignaciones de equipos están separadas del contenido de los casos. Nunca guardar datos personales o evaluaciones reales en el repositorio.

Compilar contenido: `python3 scripts/build_assessment.py`. Servir `docs/` mediante un servidor HTTP para probar; no abrir por file:// porque se carga data.json. Pruebas de lógica: `node scripts/test_assessment.cjs`. Revisar también en navegador los formularios, móvil, exportaciones e impresión antes de publicar.

Al modificar un caso, incrementar su versión en el compilador y documentar el cambio. No editar manualmente data.json. El contenido público incluye las reglas de autoría y la auditoría de estructura. El video de Bain carga solo al pulsar su botón y tiene enlace externo alternativo.
