# EDUCALEX: guía de activación segura para la propietaria

Revisión: 14 de noviembre de 2026. Solo vista previa; no publicar todavía.

Explorador sigue gratuito. Avanza, Experto y Élite son ofertas futuras «Próximamente» y «Sin pagos habilitados». Todos los cursos, la biblioteca y las cuatro prácticas de ocho preguntas siguen accesibles, sin cupos ni paquetes.

## 1. Registrar tu cuenta real en vista previa
1. Abre la vista previa de este proyecto EDUCALEX y pulsa **Regístrate** (`/registro`). Si el correo abre fuera del editor, utiliza la vista previa abierta en otra pestaña.
2. Introduce tu correo real y una contraseña personal segura de al menos ocho caracteres. No compartas la contraseña, enlaces, códigos ni capturas de una sesión con nadie ni en este chat.
3. Pulsa **Crear cuenta**. El mensaje de solicitud no significa que ya hayas ingresado: primero debes confirmar el correo.
4. Si aparece un error, copia únicamente el texto del error, sin datos privados. No repitas solicitudes rápidamente.

## 2. Confirmar correo e ingresar
1. Busca el mensaje de confirmación en tu bandeja y en correo no deseado.
2. Abre el enlace en privado; debe volver a la vista previa del mismo proyecto. Si no llega, está vencido o vuelve a un lugar incorrecto, informa solo de ese problema, sin reenviar el enlace ni el código.
3. Ingresa en `/ingresar` con tu correo y contraseña. Comprueba que el encabezado muestre **Mi cuenta** y abre `/mi-cuenta`.
4. El nombre visible es opcional. Selecciona únicamente tipo de docente y ruta de preparación si lo deseas; no registres datos sensibles o de menores.
5. Para recuperar una contraseña: escribe el correo en Ingresar, pulsa **Recuperar contraseña**, abre el mensaje recibido y guarda una nueva contraseña en `/reset-password`. Sin enlace válido la acción permanece bloqueada.

## 3. Comunicar únicamente que terminaste
Escribe: **«Completé el registro y confirmé mi correo en la vista previa de EDUCALEX».** No envíes contraseñas, códigos, enlaces de confirmación/recuperación ni tokens. Esta comunicación NO autoriza otorgar el rol de administrador.

## 4. Designar el primer administrador, en una autorización separada
1. Solicita explícitamente iniciar la designación de tu cuenta como primer administrador.
2. Mediante herramientas protegidas de Lovable Cloud, se verificará tu identidad como propietaria y la correspondencia de la cuenta real confirmada. Preferir la cuenta cuyo correo coincide con la identidad verificada de la propietaria; nunca seleccionar arbitrariamente una cuenta ni aceptar nombre visible o metadatos como prueba.
3. Si la correspondencia no se puede comprobar, detener el procedimiento. Se debe resolver mediante la identidad verificada de Lovable, sin pedir contraseñas ni códigos.
4. Presentar la cuenta objetivo identificada y pedir autorización explícita para esa cuenta antes de cambiar permisos. No realizar ese cambio en esta revisión.
5. Solo después de verificar identidad y recibir autorización, un procedimiento privilegiado añade el ID exacto y el rol `admin` a `public.user_roles`, conservando cualquier rol existente. Comprobar que se asignó únicamente a la cuenta autorizada y registrar la autorización/resultados sin secretos.
6. Cerrar sesión e ingresar de nuevo, abrir `/admin` y comprobar acceso. Una cuenta real no administradora debe ver **Acceso restringido**. Las funciones administrativas también deben rechazarla directamente.

No hay autoasignación de administrador ni escrituras de roles desde la aplicación. El editor administrativo existente solo configura borradores de niveles, sin activar pagos o restricciones. Otras funciones administrativas continúan en preparación.

## 5. Google, únicamente cuando lo autorices
Google está desactivado; no se presenta como operativo.
1. Indica explícitamente que autorizas habilitar el proveedor Google y explica que permitirá acceder con una cuenta de ese servicio.
2. Tras tu aprobación, utilizar la configuración administrada de acceso social de Lovable para Google. No se requieren credenciales personales ni habilitar otros proveedores.
3. Los ajustes se encuentran en **Más → Usuarios → Configuración de autenticación → Métodos de acceso → Google**.
4. Añadir el botón oficial y comprobar que regrese a una dirección pública del mismo proyecto; abrir Mi cuenta solo después de que se confirme la sesión.
5. Probar en la vista previa y posteriormente en el dominio que se autorice. La activación y prueba quedan pendientes hasta tu decisión.

## 6. Probar con dos usuarios reales antes de publicar
Ambas personas deben registrarse, confirmar sus propios correos y acceder por sí mismas. No crear usuarios ficticios ni compartir credenciales. Usar navegadores/perfiles separados.

| Prueba | Usuario A | Usuario B | Resultado requerido |
| --- | --- | --- | --- |
| Perfil | Guardar nombre opcional/ruta | Guardar valores diferentes | Cada persona ve solo su perfil tras recargar |
| Progreso | Inscribirse en Guía 34, completar unidad 1 | Completar otra unidad o curso | `/mi-progreso` muestra únicamente el avance propio |
| Historial | Entregar una práctica original | Entregar otra práctica | `/mis-resultados` conserva únicamente los intentos propios |
| Persistencia | Recargar, cerrar e ingresar | Repetir por separado | Los registros propios permanecen |
| Salida | Cerrar sesión y pulsar Atrás | Repetir | No reaparece información privada; rutas personales piden acceso |
| Administración | Propietaria autorizada abre `/admin` | Cuenta sin rol abre `/admin` | Solo la propietaria autorizada accede |
| Recuperación | Solicitar enlace y cambiar contraseña | No compartir el enlace | Nueva contraseña funciona; enlace vencido no permite cambiar |

La revisión técnica A/B debe comprobar también que lecturas/escrituras directas de otro usuario están rechazadas por RLS y que las funciones administrativas no se pueden invocar sin el rol. No basta con ocultar botones. Reportar resultados sin correos, contraseñas ni códigos. No borrar registros personales para probar.

## Qué se verificó y qué falta
- Ajustes alojados consultados: registro permitido, email/password habilitado, confirmación obligatoria, acceso anónimo y Google desactivados. El paso de habilitar correo confirmó que **ya estaba habilitado**, sin desactivar confirmación.
- Nueve tablas públicas con RLS activado; sin SELECT para `anon`. Datos personales limitados al usuario; roles sin INSERT/UPDATE/DELETE para `authenticated`; actualización de perfil limitada a sus campos mínimos. La función de roles solo responde sobre el usuario autenticado. El disparador de registro crea perfil y rol `member`, no `admin`.
- Recuperación contempla el evento de sesión aunque la biblioteca de acceso ya haya consumido el fragmento del enlace. Solicitudes fallidas liberan los botones y muestran errores seguros. Cierre de sesión limpia registros en memoria y no redirige como si hubiera terminado cuando falla.
- **Cero cuentas registradas al revisar**. Entrega real de correos, confirmación, recuperación, guardado/lectura autenticados, aislamiento A/B y acceso del primer administrador siguen pendientes. No se crearon usuarios ni se asignaron roles.
- Accesibilidad: formularios con etiquetas, avisos anunciados, botones principales de al menos 44 px y un único contenido principal; revisión de teclado y pantallas públicas. Pantallas personales en sesión real pendientes.
- Antes de publicar: completar pruebas reales, revisar privacidad/términos y dar autorización expresa de publicación. Los talleres no se guardan; el progreso es autodeclarado; las claves de las prácticas son inspeccionables, sin garantía antifraude ni certificación oficial.