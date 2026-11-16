# Revisión transversal de acceso y guardado

## Regla
Ningún acceso o guardado fallido debe parecer exitoso, y nadie debe ver registros, respuestas ni avisos pendientes de otra cuenta. Los registros ya guardados no se alteran durante esta revisión.

## Superficies revisadas y resultado
| Lugar | Código leído | Cumplimiento |
| --- | --- | --- |
| Registro, Ingresar, /auth, recuperación | auth-form, auth-feedback, rutas públicas correspondientes | Confirma errores, espera confirmación cuando no existe sesión y bloquea recuperación sin sesión validada; cumple tras revisión anterior |
| Encabezado, menú móvil, comparación de niveles | site-shell, preparation-plans, account-session | Derivados de sesión; se corrigió la limpieza también al cambiar directamente de identidad |
| Mi cuenta, Mis cursos, Mi progreso, Mis resultados | learning-account y las cuatro rutas protegidas | Lecturas fallidas permiten reintento; guardados y salida fallidos no anuncian éxito; formularios se reinician al cambiar identidad |
| Guía 34 y cuatro cursos ampliados | guia-34-course, training-course, UnitCompletion | Reutilizan guardado por usuario con errores/reintento; el árbol compartido reinicia estados personales al cambiar cuenta |
| Cuatro prácticas: inicio, entrega manual/por plazo y resultados | practice-exam, practice-session, practice-results y sus rutas | Se corrigieron respuestas tardías de guardado que podían mostrar avisos en otra sesión; se reinicia también el intento visible al cambiar identidad |
| Historial y persistencia de entregas | saveAttempt, getLearning | Se añadió lectura de comprobación por ID y propietario antes de confirmar guardado; los intentos existentes no se sobrescriben |
| Administración y ocho secciones | admin.tsx y todos sus hijos | Todos heredan comprobación de rol del servidor; las secciones no implementadas no fingen operaciones |
| Editor de niveles y auditoría | offer-draft-admin, getOfferDrafts, saveOfferDraft | Autenticación y rol comprobados en ambas funciones; se exige fila devuelta antes de anunciar guardado |
| Todas las funciones personales | getLearning, updateProfile, saveUnit, saveAttempt, checkAdmin, learningBearer y middleware generado | Todas llevan autenticación, usuario obtenido del servidor y RLS; no se cambia middleware generado ni permisos |
| Funciones de base | create_learning_profile, has_role, audit_practice_offer_draft; políticas y privilegios públicos | Perfil/rol member automáticos, nunca admin; consulta de rol propio y auditoría interna. No se modifican funciones, políticas ni datos |
| Certificados y Mis simulacros | rutas protegidas y ModulePage | Sin emisión/servicios ficticios; heredan sesión y avisos de indisponibilidad |
| DOCENTE IA | docente-ia-chat y su ruta API | Consulta independiente del historial personal, maneja errores de respuesta; no escribe perfil/progreso/roles |
| Tareas en segundo plano | Temporizador de práctica, renovación de sesión y callbacks de guardado | El temporizador se desmonta al cambiar identidad; renovación no fuerza invalidaciones; callbacks obsoletos ignorados. No hay cron de cuentas/pagos |

No se crearon usuarios, asignaron roles, cambiaron proveedores, ajustes o permisos, ni modificaron registros guardados. Verificación real con dos cuentas sigue bloqueada hasta que ambas personas se registren y confirmen sus propios correos. La prueba con servicio simulado verifica regresiones, no acredita una sesión real ni entrega de correos.