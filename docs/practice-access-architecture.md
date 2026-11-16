# Niveles de preparación: configuración inactiva

Cada usuario empieza gratis. No hay condición de 100 inscritos ni espera de 2–3 meses. Las cuatro prácticas actuales de ocho preguntas por perfil conservan acceso libre, repetición y entrega sin consumo de cupos.

## Configuración futura
EDUCALEX ofrecerá únicamente niveles de preparación: Explorador (gratuito), Avanza, Experto y Élite (futuros premium). No se ofrecen paquetes de simulacros. El administrador autorizado puede editar nombres internos y reglas futuras separadas de contenido y simulacros; guardar no activa, publica ni modifica el nivel actual. La comparación pública muestra solo los cuatro niveles aprobados y beneficios futuros por definir, no los borradores internos.

## Estructura preparada
- `practice_offer_drafts`: reutilizada para reglas internas `content_rules` y `simulation_rules` por nivel, solo administradores; revisión y auditoría conservadas. `extra_attempts`, `integral_access` y `level_rules` son legado de paquetes marcado como obsoleto, sin uso por la interfaz o decisiones de acceso. Las actualizaciones preservan sus valores; las inserciones usan valores neutros de compatibilidad.
- `practice_access_rights`: legado de paquetes obsoleto sin uso; datos preservados, sin concesión o consumo.
- `practice_level_drafts`: borradores históricos por usuario/perfil; no determinan nivel actual ni conceden permisos.
- `practice_access_ledger`: registro append-only de actor, motivo, fecha, antes/después y referencia al intento; el cliente solo puede leer sus propios registros, o todos si es administrador. Cambios de oferta generan auditoría automática. Otros derechos/niveles no tienen interfaz de escritura activa.
- Todas las tablas tienen RLS y permisos explícitos. El cliente no puede concederse cupos, nivel o admin ni modificar la auditoría. Las funciones del editor verifican admin en servidor y vuelven a aplicar RLS.

## Nivel efectivo y futura activación
`getLearning` devuelve Explorador desde una política del servidor. El progreso es un resumen de unidades completadas, no un ascenso comercial automático. Ni valores de navegador ni borradores de admin desbloquean o limitan contenido. `/planes` es pública; `/mi-cuenta` muestra nivel y avance personal bajo la protección existente.

`futureConsumptionDesign` y `initialOfferDrafts` se conservan únicamente como diseño legado probado, sin importación en las interfaces o flujo de acceso. No son endpoints. La auditoría exige delta cero. No existen funciones de compra, cobro, ascenso o activación. Una futura autorización deberá definir beneficios reales, reglas por nivel, derechos personales verificables en servidor y su auditoría; no reutilizar derechos de paquetes como contratación de niveles.

## Pendientes bloqueantes
La consulta actual confirma cero cuentas registradas. La creación de usuario temporal requiere aprobación no disponible en este contexto. Verificación real de login/logout, progreso, historial, aislamiento A/B y editor administrativo pendiente de registro/confirmación de correo e ingreso en vista previa y designación segura del primer admin. Google no está implementado ni se presenta operativo; requiere autorización para habilitar el proveedor administrado. Nunca compartir contraseñas en chat. No se activaron precios, checkout, Stripe, suscripciones ni publicación.