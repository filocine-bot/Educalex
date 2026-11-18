// Contenido de la Política de Tratamiento de Datos Personales y de los Términos y Condiciones de EDUCALEX.
// Borrador para revisión de la propietaria. No es asesoría jurídica: conviene que lo revise un abogado.
// Marco: Ley Estatutaria 1581 de 2012 y Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015, Libro 2, Parte 2, Título 2, Capítulo 25).

/** Datos de la responsable. Los valores entre corchetes deben confirmarse antes de publicar. */
export const LEGAL_OWNER = {
  name: "Enadis Ester Vargas Hernández",
  role: "persona natural, responsable del tratamiento",
  city: "[municipio por confirmar], Córdoba, Colombia",
  email: "[correo de contacto por confirmar]",
};

export const LEGAL_VERSION = "2026-11-18";
export const LEGAL_VERSION_LABEL = "18 de noviembre de 2026";

export type LegalSection = { title: string; paragraphs?: string[]; items?: string[]; closing?: string };

export const privacyIntro = `Esta política explica cómo EDUCALEX – Academia Inteligente de Educación trata los datos personales de las personas que usan el sitio, en cumplimiento de la Ley Estatutaria 1581 de 2012 y del Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015. Al crear una cuenta, la persona declara que la leyó y autoriza el tratamiento descrito.`;

export const privacySections: LegalSection[] = [
  {
    title: "1. Responsable del tratamiento",
    items: [
      `Nombre: ${LEGAL_OWNER.name} (${LEGAL_OWNER.role}), titular del proyecto EDUCALEX.`,
      `Ubicación: ${LEGAL_OWNER.city}.`,
      `Correo para consultas y reclamos sobre datos personales: ${LEGAL_OWNER.email}.`,
      "Sitio web: https://educalex-six.vercel.app",
    ],
  },
  {
    title: "2. Datos que tratamos",
    paragraphs: ["Solo pedimos los datos necesarios para que la plataforma funcione:"],
    items: [
      "Datos de la cuenta: correo electrónico y contraseña. La contraseña se guarda cifrada por el proveedor de autenticación; EDUCALEX no puede leerla.",
      "Perfil educativo: la ruta de preparación que eliges (por ejemplo, ingreso docente, ascenso, coordinador, rector o directivo en ejercicio) y, si lo escribes, un nombre visible.",
      "Actividad de aprendizaje: cursos en los que te inscribes, unidades completadas y resultados de los simulacros (respuestas, aciertos, tiempo y fecha).",
      "Registro de tu autorización: versión de esta política que aceptaste y la fecha.",
      "Consultas a EducatIA: el texto que escribes (o que dictas por voz) se envía al proveedor de inteligencia artificial para generar la respuesta. EDUCALEX no guarda esas conversaciones en su base de datos.",
      "Voz: el reconocimiento de voz y la lectura en voz alta los realiza tu propio navegador (por ejemplo, Chrome puede usar los servicios de voz de Google). EDUCALEX no graba ni guarda audio.",
      "Datos técnicos: la dirección IP se usa de forma temporal, sin almacenarse en nuestra base de datos, para limitar el abuso del asistente. El proveedor de alojamiento puede registrarla en sus bitácoras de funcionamiento y seguridad.",
    ],
  },
  {
    title: "3. Datos que no pedimos",
    paragraphs: [
      "EDUCALEX no solicita datos sensibles (salud, origen racial o étnico, orientación política o sexual, convicciones religiosas, datos biométricos, entre otros). Te pedimos no incluirlos en tus consultas a EducatIA ni en ningún campo del sitio.",
      "La plataforma está dirigida a personas adultas: docentes, aspirantes y directivos. No está dirigida a niños, niñas ni adolescentes, y no deben registrarse menores de 18 años ni incluirse datos de estudiantes menores de edad en las consultas.",
      "El sitio no usa cookies de publicidad ni herramientas de analítica de terceros. El navegador guarda tu sesión de forma local para que no tengas que ingresar en cada visita.",
    ],
  },
  {
    title: "4. Finalidades",
    items: [
      "Crear y administrar tu cuenta, y permitirte ingresar de forma segura.",
      "Guardar tu progreso en cursos y tu historial de simulacros para que puedas consultarlo.",
      "Personalizar la navegación según el perfil educativo que elijas.",
      "Responder tus preguntas en EducatIA.",
      "Atender tus consultas, reclamos y solicitudes sobre tus datos.",
      "Elaborar estadísticas agregadas y anónimas de uso para mejorar la plataforma.",
      "Enviarte comunicaciones necesarias sobre tu cuenta (por ejemplo, confirmación o recuperación de contraseña). No enviamos publicidad sin tu autorización adicional.",
    ],
    closing: "No vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales.",
  },
  {
    title: "5. Proveedores que tratan datos por cuenta de EDUCALEX",
    paragraphs: [
      "Para funcionar, EDUCALEX usa proveedores tecnológicos que actúan como encargados del tratamiento, bajo sus condiciones contractuales de protección de datos. Algunos operan fuera de Colombia, por lo que los datos pueden ser transmitidos a otros países:",
    ],
    items: [
      "Supabase: base de datos y autenticación de cuentas. Servidores en São Paulo, Brasil.",
      "Vercel: alojamiento y publicación del sitio. Infraestructura en Estados Unidos y otros países.",
      "Anthropic: modelo de inteligencia artificial que genera las respuestas de EducatIA. Estados Unidos. Solo recibe el texto de las consultas.",
    ],
  },
  {
    title: "6. Derechos de los titulares",
    paragraphs: ["Como titular de los datos, conforme al artículo 8 de la Ley 1581 de 2012, tienes derecho a:"],
    items: [
      "Conocer, actualizar y rectificar tus datos personales.",
      "Solicitar prueba de la autorización que otorgaste.",
      "Ser informado, previa solicitud, sobre el uso que se ha dado a tus datos.",
      "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley, después de haber agotado el trámite de consulta o reclamo ante EDUCALEX.",
      "Revocar la autorización y solicitar la supresión de tus datos cuando no exista un deber legal o contractual de conservarlos.",
      "Acceder en forma gratuita a tus datos personales.",
    ],
  },
  {
    title: "7. Cómo ejercer tus derechos",
    paragraphs: [
      `Escribe a ${LEGAL_OWNER.email} desde el correo registrado en tu cuenta, indicando tu nombre, el correo de la cuenta, la solicitud concreta y, si se trata de un reclamo, los hechos y los documentos que quieras hacer valer.`,
      "Consultas: se responden en un máximo de diez (10) días hábiles desde su recibo. Si no es posible en ese plazo, te informaremos el motivo y la nueva fecha, que no superará cinco (5) días hábiles adicionales.",
      "Reclamos (corrección, actualización, supresión o revocatoria): se responden en un máximo de quince (15) días hábiles desde el día siguiente a su recibo. Si no es posible en ese plazo, te informaremos el motivo y la nueva fecha, que no superará ocho (8) días hábiles adicionales. Si el reclamo está incompleto, te pediremos completarlo dentro de los cinco (5) días hábiles siguientes; si pasan dos (2) meses sin respuesta, se entenderá que desististe.",
      "Para eliminar tu cuenta y tus datos, escribe con el asunto «Eliminar mi cuenta». Se borrarán tu perfil, tu progreso y tus resultados, salvo lo que la ley obligue a conservar.",
    ],
  },
  {
    title: "8. Seguridad",
    paragraphs: [
      "La información viaja cifrada (HTTPS). En la base de datos, cada persona solo puede leer y modificar sus propios registros, mediante reglas de seguridad por fila. Los roles de administración se asignan únicamente desde el panel protegido del proveedor y no pueden solicitarse desde el sitio. Ningún sistema es completamente infalible; si detectamos un incidente que afecte tus datos, te informaremos y lo reportaremos a la autoridad cuando corresponda.",
    ],
  },
  {
    title: "9. Vigencia",
    paragraphs: [
      `Esta política rige desde el ${LEGAL_VERSION_LABEL}. Tus datos se conservarán mientras tu cuenta esté activa o hasta que solicites su supresión. La base de datos estará vigente mientras EDUCALEX preste sus servicios.`,
      "Si cambiamos esta política de forma sustancial, lo avisaremos en el sitio antes de aplicar los cambios y, cuando la ley lo exija, pediremos de nuevo tu autorización.",
    ],
  },
];

export const termsIntro = `Estos términos regulan el uso de EDUCALEX – Academia Inteligente de Educación. Al usar el sitio o crear una cuenta, aceptas estas condiciones. Si no estás de acuerdo, no uses la plataforma.`;

export const termsSections: LegalSection[] = [
  {
    title: "1. Qué es EDUCALEX",
    paragraphs: [
      `EDUCALEX es una plataforma de formación y preparación para docentes, aspirantes a la carrera docente y directivos docentes en Colombia, administrada por ${LEGAL_OWNER.name}. Ofrece una biblioteca normativa con enlaces a fuentes oficiales, cursos de autoestudio, simulacros de práctica y el asistente EducatIA, que puede leer sus respuestas en voz alta.`,
    ],
  },
  {
    title: "2. Carácter no oficial",
    items: [
      "EDUCALEX no pertenece ni está vinculada a la Comisión Nacional del Servicio Civil (CNSC), al Ministerio de Educación Nacional, al ICFES ni a ninguna secretaría de educación.",
      "Los simulacros son preguntas originales de práctica. No reproducen pruebas oficiales ni garantizan un puntaje, un resultado, un nombramiento, un ascenso ni una reubicación.",
      "La información normativa se revisa en fuentes oficiales, pero las normas y convocatorias cambian. Antes de tomar decisiones, confirma siempre en los sitios oficiales (CNSC, SIMO, MEN, Función Pública).",
      "Los cursos y simulacros no otorgan certificados oficiales ni créditos de formación reconocidos para el escalafón.",
    ],
  },
  {
    title: "3. EducatIA",
    paragraphs: [
      "EducatIA genera respuestas con inteligencia artificial a partir de las fuentes de la biblioteca. Las respuestas pueden contener errores u omisiones: son una orientación de estudio, no asesoría jurídica ni concepto oficial. Verifica siempre la información importante en la norma o fuente oficial citada.",
      "No escribas en EducatIA datos personales sensibles, información de estudiantes ni datos de terceros. El servicio tiene límites de uso para evitar abusos.",
    ],
  },
  {
    title: "4. Tu cuenta",
    items: [
      "Debes ser mayor de 18 años y suministrar un correo que te pertenezca.",
      "Eres responsable de mantener tu contraseña en reserva y de la actividad realizada con tu cuenta.",
      "Puedes solicitar la eliminación de tu cuenta en cualquier momento, como indica la Política de privacidad.",
    ],
  },
  {
    title: "5. Uso permitido",
    paragraphs: ["Al usar EDUCALEX te comprometes a no:"],
    items: [
      "Usar la plataforma con fines ilegales o para perjudicar a otras personas.",
      "Intentar acceder a cuentas, datos o funciones de administración que no te correspondan.",
      "Copiar de forma masiva el banco de preguntas o los contenidos para revenderlos o publicarlos como propios.",
      "Sobrecargar el servicio de forma automatizada o eludir sus límites de uso.",
    ],
  },
  {
    title: "6. Propiedad intelectual",
    paragraphs: [
      "Los textos, preguntas de práctica, cursos, diseño y marca EDUCALEX son de su titular, salvo que se indique otra cosa. Puedes usarlos para tu preparación personal. Las normas y documentos oficiales enlazados pertenecen a sus autores o son de dominio público, y se citan con su fuente.",
    ],
  },
  {
    title: "7. Gratuidad y planes futuros",
    paragraphs: [
      "Actualmente todos los contenidos y simulacros son gratuitos. Si en el futuro se ofrecen planes de pago, sus condiciones, precios y derechos se informarán con claridad antes de cualquier cobro, y los contenidos gratuitos existentes no se restringirán sin aviso previo.",
    ],
  },
  {
    title: "8. Disponibilidad y responsabilidad",
    paragraphs: [
      "Procuramos que la plataforma esté disponible y actualizada, pero puede haber interrupciones, errores o cambios en los contenidos. En la medida permitida por la ley, EDUCALEX no responde por decisiones tomadas únicamente con base en la información del sitio, por el resultado de concursos o evaluaciones, ni por fallas de servicios de terceros.",
      "El sitio incluye enlaces a páginas oficiales y externas que no controlamos.",
    ],
  },
  {
    title: "9. Cambios, ley aplicable y contacto",
    paragraphs: [
      `Estos términos rigen desde el ${LEGAL_VERSION_LABEL} y pueden actualizarse; los cambios importantes se avisarán en el sitio. Se rigen por las leyes de la República de Colombia. Para cualquier inquietud escribe a ${LEGAL_OWNER.email}.`,
    ],
  },
];

/** Indica si aún hay datos de la responsable por confirmar (valores entre corchetes). */
export const legalPending = Object.values(LEGAL_OWNER).some((v) => v.includes("["));
