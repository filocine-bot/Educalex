# Navegación educativa por perfil

Las dos barras comparten identidad institucional y permanecen visibles al desplazarse. La barra general conserva academia, formación, biblioteca, IA y contacto. En anchos medianos la identidad y el acceso ocupan una fila y los enlaces otra; en celular hay dos menús organizados. No se recortan destinos para imponer una sola línea.

El registro solicita uno de cinco perfiles educativos. Se reutilizan los campos mínimos existentes `preparation_path` y `teacher_type`; una migración amplía los valores permitidos con `directivo` y el disparador valida la selección antes de crear el perfil. Solo asigna `member`, nunca `admin`. Las cuentas existentes conservan sus datos.

La barra especializada y `/mi-panel` leen el perfil de la cuenta mediante la consulta protegida existente. El selector visible cambia el perfil educativo y refresca las recomendaciones; Mi cuenta permite cambiarlo también. Sin un perfil válido, una persona con sesión no recibe menús de otros perfiles. Los visitantes siguen pudiendo explorar las cuatro rutas públicas.

## Límites explícitos
- Cambiar el perfil educativo personal no concede un cargo, acreditación ni permiso administrativo. No hay autorización de varios perfiles/roles nuevos: el selector cambia únicamente la preferencia educativa activa, porque todos los contenidos actuales siguen gratuitos.
- Las competencias enlazan al módulo de la ruta existente; no se han inventado cursos específicos ni simulacros nuevos. PEI y liderazgo conservan su estado «en preparación». No hay simulacro de directivo en ejercicio.
- Gestión de usuarios, perfiles autorizados, certificados e informes administrativos sigue en preparación; no se han activado operaciones no implementadas. El acceso admin existente mantiene verificación de servidor y RLS.
- Cero usuarios registrados durante la revisión: registro real, disparador ejecutado en una alta real, cambio persistente de perfil, panel autenticado y aislamiento entre dos cuentas quedan pendientes hasta que la propietaria y una segunda persona registren y confirmen sus cuentas. No se crearon usuarios ficticios, asignaron administradores ni habilitaron Google.
- 95 pruebas automatizadas aprobadas; seis anchos (1440, 1280, 1024, 944, 820, 390 px) comprobados para las barras públicas, submenús, cierre al navegar, ausencia de desbordamiento y posición sticky; sin errores de navegador. Compilación automática OK.
- Logo, portada, cursos, biblioteca y cuatro prácticas se conservan; pagos y publicación desactivados.