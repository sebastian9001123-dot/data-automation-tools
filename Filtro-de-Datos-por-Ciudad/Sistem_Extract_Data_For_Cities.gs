function filtrarDatosPorBarrioBogota() {
  // IDs de los archivos de origen (datos consolidados)
  const archivoOrigenId1 = "15BYRNCcYrBxeqWWEas0eyes4dFXRBO_7jT0ypc0DbPQ";
  const archivoOrigenId2 = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
"EDUARDO SANTOS": "2429511001",
    "EL PROGRESO": "2429511001",
    "TIVOLI": "2429511001",
    "SANTA ISABEL": "2429511001",
    "VERAGUAS": "2429511001",
    "SANTA ISABEL": "2429511001",
    "EL VERGEL": "2429511001",
    "LA CAMELIA": "2429611001",
    "CIUDAD MONTES": "2429611001",
    "SAN EUSEBIO": "2429611001",
    "SAN FRANCISCO": "2429611001",
    "MILENTA": "2429611001",
    "OSPINA PEREZ": "2429611001",
    "MUZU": "2429611001",
    "SANTA RITA": "2429611001",
    "VILLA DEL ROSARIO": "2429611001",
    "LOS SAUCES": "2429611001",
    "GALAN": "2429611001",
    "BARCELONA": "2429711001",
    "LA PRADERA": "2429711001",
    "COLON": "2429711001",
    "LA TRINIDAD": "2429711001",
    "SAN GABRIEL": "2429711001",
    "SALAZAR GOMEZ": "2429711001",
    "CIUDAD JARDIN SUR": "2429811001",
    "CIUDAD BERNA": "2429811001",
    "POLICARPA": "2429811001",
    "SEVILLA": "2429811001",
    "SAN ANTONIO": "2429911001",
    "LUNA PARK": "2429911001",
    "LA FRAGUITA": "2429911001",
    "EDUARDO FREI": "2429911001",
    "SANTANDER": "2429911001",
    "SAN JORGE CENTRAL": "2429911001",
    "LAS BRISAS": "2430011001",
    "LA MARIA": "2430011001",
    "CALVO SUR": "2430011001",
    "BUENOS AIRES": "2430011001",
    "VILLA JAVIER": "2430011001",
    "VEINTE DE JULIO": "2430011001",
    "SAN JOSE": "2430011001",
    "GRANADA": "2430111001",
    "CARTAGENA": "2430111001",
    "EL CONSUELO": "2430111001",
    "EL DORADO": "2430111001",
    "EL ROCIO": "2430111001",
    "ESTADOS UNIDOS": "2430111001",
    "SAN JOSE": "2430111001",
    "CENTRO": "2430111001",
    "SANTA HELENITA": "2430111001",
    "LOS LACHES": "2430111001",
    "LOURDES": "2430111001",
    "RAMIREZ": "2430111001",
    "SAN DIONISIO": "2430111001",
    "SANTA ROSA DE LIMA": "2430111001",
    "SAN JORGE SUR": "2430211001",
    "MARCO FIDEL SUAREZ": "2430211001",
    "SANTA LUCIA": "2430211001",
    "QUIROGA SUR": "2430211001",
    "EL CARMEN": "2430211001",
    "EL SOCORRO": "2430211001",
    "EL PLAYON": "2430211001",
    "MOLINOS": "2430211001",
    "RINCON DE VENECIA": "2430311001",
    "ISLA DEL SOL": "2430311001",
    "SAN CARLOS": "2430311001",
    "FATIMA": "2430311001",
    "EL CARMEN": "2430311001",
    "SAN VICENTE": "2430311001",
    "GRAN AMERICA": "2430411001",
    "EL RECUERDO": "2430411001",
    "QUINTA PAREDES": "2430411001",
    "TEUSAQUILLO": "2430411001",
    "LA SOLEDAD NORTE": "2430411001",
    "CARVAJAL": "2430511001",
    "TIMIZA": "2430511001",
    "BOITA": "2430511001",
    "MANDALAY": "2430511001",
    "CLASS": "2430611001",
    "ROMA": "2430611001",
    "VILLA ZARZAMORA": "2430611001",
    "BRITALIA": "2430611001",
    "CASABLANCA": "2430611001",
    "ALTAMAR": "2430711001",
    "ROSARIO": "2430711001",
    "TAYRONA": "2430711001",
    "SAN PABLO": "2430711001",
    "PATIO BONITO": "2430711001"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 69000;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 2000;

  // Función para procesar un archivo de origen
  function procesarArchivo(archivoOrigenId, datosFiltrados, conteoPorBarrio, barriosSinDatos) {
    const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
    const hojaOrigen = archivoOrigen.getActiveSheet();
    const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, hojaOrigen.getLastColumn()).getValues();

    for (const barrio in barriosDeseados) {
      let contador = conteoPorBarrio[barrio] || 0; // Usar el contador existente o inicializarlo en 0
      const regexBarrio = new RegExp(barrio, 'i');
      const numacro = barriosDeseados[barrio];

      for (const fila of datos) {
        if (regexBarrio.test(fila[4])) {
          datosFiltrados.push([numacro, barrio, fila[3]]);
          conteoPorBarrio[barrio] = ++contador;

          if (contador >= cantidadPorBarrio) {
            break;
          }
        }
      }
    }
  }

  // Inicializar variables
  const datosFiltrados = [];
  const barriosSinDatos = Object.keys(barriosDeseados); // Inicializar con todos los barrios deseados
  const conteoPorBarrio = {};
  let contadorTotal = 0;

  // Procesar ambos archivos
  procesarArchivo(archivoOrigenId1, datosFiltrados, conteoPorBarrio, barriosSinDatos);
  procesarArchivo(archivoOrigenId2, datosFiltrados, conteoPorBarrio, barriosSinDatos);

  // Calcular el contador total
  for (const barrio in conteoPorBarrio) {
    contadorTotal += conteoPorBarrio[barrio];
    // Si se encontraron datos para un barrio, removerlo de la lista de barrios sin datos
    const index = barriosSinDatos.indexOf(barrio);
    if (index > -1) {
      barriosSinDatos.splice(index, 1);
    }
  }

  // Limitar la cantidad total de datos
  if (contadorTotal > cantidadTotalDatos) {
    datosFiltrados.splice(cantidadTotalDatos);
    contadorTotal = cantidadTotalDatos;
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen) (MODIFICADO)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados (MODIFICADO)
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro (NUEVO)
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioHonda() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "15BYRNCcYrBxeqWWEas0eyes4dFXRBO_7jT0ypc0DbPQ";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs
  const barriosDeseados = {
    "INGLES": "532711001",
    "BRAVO": "532711001",
    "PAEZ": "532711001",
    "MURILLO TORO": "532711001",
    "QUIROGA SUR": "532711001",
    "QUIROGA CENTRAL": "532711001",
    "CLARET": "532711001",
    "LIBERTADOR": "532711001",
    "CENTENARIO": "532711001",
    "SANTIAGO PEREZ": "532711001",
    "OLAYA": "532711001",
    "EL PLAYON": "532811001",
    "EL SOCORRO": "532811001",
    "SANTA LUCIA": "532811001",
    "SAN JORGE SUR": "532811001",
    "MARCO FIDEL SUAREZ": "532811001",
    "EL CONSUELO": "532811001",
    "MOLINOS DEL SUR": "532911001",
    "PUERTO RICO": "532911001",
    "PRADERA SUR": "532911001",
    "CALLEJON SANTA BARBARA": "532911001",
    "VILLA GLADYS": "532911001",
    "RINCON DE VENECIA": "533011001",
    "NUEVO MUZU": "533011001",
    "LAGUNETA": "533011001",
    "FATIMA": "533011001",
    "SAN VICENTE FERRER": "533011001",
    "EL CARMEN": "533011001",
    "TUNJUELITO": "533011001",
    "SAN CARLOS": "533011001",
    "LA FRAGUITA": "533111001",
    "CIUDAD JARDIN SUR": "533111001",
    "CARACAS": "533111001",
    "CIUDAD BERNA": "533111001",
    "POLICARPA SALAVARRIETA": "533111001",
    "EDUARDO FREY": "533111001",
    "SANTANDER SUR": "533111001",
    "GALAN": "533211001",
    "OSPINA PÉREZ": "533211001",
    "MUZU": "533211001",
    "MILENTA": "533211001",
    "EL TEJAR": "533211001",
    "CARABELAS": "533211001",
    "PONDEROSA": "533211001",
    "SANTA MATILDE": "533211001",
    "EL SOL": "533211001",
    "ALCALA": "533211001",
    "CORKIDI": "533211001"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 27900;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 600;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Honda"); // Obtener la hoja "Honda"

  // 7. Obtener los datos de la hoja (CORREGIDO)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 2).getValues(); // Obtener datos de las columnas A y B

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      if (regexBarrio.test(fila[1])) {
        // Extraer los datos con NUMACRO
        datosFiltrados.push([numacro, fila[1], fila[0]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioCorozal() {
  // ID del archivo de origen (datos consolidados)
  const archivoOrigenId2 = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseadosArchivo2 = { // Para "Corozal"
    "VILLA MARTA": "2377670215",
    "CEIBON": "2377670215",
    "AVENIDA SAN BLAS": "2377670215",
    "LOS OLIVOS": "2377670215",
    "EL JARDIN": "2377670215",
    "LA CONCEPCION": "2377770215",
    "MARRUECOS": "2377770215",
    "SAN FRANCISCO": "2377770215",
    "LOS CEREZOS": "2377770215",
    "SAN CARLOS": "2377770215",
    "EL OASIS": "2377770215",
    "DAGER CHADID": "2377770215",
    "11 DE NOVIEMBRE": "2377770215",
    "LAS ALBERCAS": "2377770215",
    "SAN JUAN": "2377770215",
    "LUIS CARLOS GALAN": "2377870215",
    "BRUCELAS": "2377870215",
    "2 DE FEBRERO": "2377870215",
    "SAN IGNACIO": "2377870215",
    "LA JOSEFINA": "2377870215",
    "ALTO PRADO": "2377970215",
    "BUENOS AIRES": "2377870215",
    "ASOVIPOVA": "2377870215",
    "EL TENDAL": "2377870215",
    "LOS ALPES": "2377870215"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 5000;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 220;

  // Función para buscar la hoja por nombre aproximado
  function buscarHojaPorNombreAproximado(archivoOrigen, nombreHoja) {
    const hojas = archivoOrigen.getSheets();
    const regex = new RegExp(nombreHoja, 'i'); // 'i' para búsqueda insensible a mayúsculas/minúsculas

    for (const hoja of hojas) {
      if (regex.test(hoja.getName())) {
        return hoja;
      }
    }
    return null; // Retorna null si no se encuentra la hoja
  }

  // Función para procesar un archivo de origen
  function procesarArchivo(archivoOrigenId, datosFiltrados, conteoPorBarrio, barriosEncontrados, barriosSinDatos, nombreHoja, barriosDeseados) {
    const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
    const hojaOrigen = buscarHojaPorNombreAproximado(archivoOrigen, nombreHoja);

    if (!hojaOrigen) {
      Logger.log(`No se encontró una hoja similar a '${nombreHoja}' en el archivo '${archivoOrigenId}'.`);
      return; // Sale de la función si no se encuentra la hoja
    }

    // Registro para verificar el rango de datos
    Logger.log(`Nombre de la hoja: ${hojaOrigen.getName()}`);
    Logger.log(`Última fila de la hoja: ${hojaOrigen.getLastRow()}`);
    Logger.log(`Última columna de la hoja: ${hojaOrigen.getLastColumn()}`);

    const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, hojaOrigen.getLastColumn()).getValues();
    Logger.log(`Cantidad de filas en los datos extraídos: ${datos.length}`); // Registro del número de filas extraídas
    let datosEncontrados = false; // Variable para verificar si se encontraron datos

    for (const barrio in barriosDeseados) {
      let contador = conteoPorBarrio[barrio] || 0;
      const regexBarrio = new RegExp(barrio, 'i');
      const numacro = barriosDeseados[barrio];

      for (const fila of datos) {
        // Registro de la fila actual para depurar
        Logger.log(`Fila actual: ${JSON.stringify(fila)}`);

        if (regexBarrio.test(fila[4])) {
          datosFiltrados.push([numacro, barrio, fila[3]]);
          conteoPorBarrio[barrio] = ++contador;
          barriosEncontrados[barrio] = true; // Registrar que se encontró el barrio
          datosEncontrados = true; // Se encontraron datos
          Logger.log(`Encontrado: ${barrio} en ${nombreHoja}`); // Registro detallado

          if (contador >= cantidadPorBarrio) {
            break;
          }
        }
      }

      if (conteoPorBarrio[barrio] === 0) {
        barriosSinDatos.push(barrio);
      }
    }

    if (datosEncontrados) {
      Logger.log(`Se encontraron datos en el archivo: ${archivoOrigenId}, hoja: ${nombreHoja}`);
    } else {
      Logger.log(`No se encontraron datos en el archivo: ${archivoOrigenId}, hoja: ${nombreHoja}`);
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen) (MODIFICADO)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // Inicializar variables
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let conteoPorBarrio = {};
  let barriosEncontrados = {};

  // Procesar el archivo de origen 2 (Corozal)
  Logger.log("Procesando Archivo 2 (Corozal)");
  procesarArchivo(archivoOrigenId2, datosFiltrados, conteoPorBarrio, barriosEncontrados, barriosSinDatos, "Corozal", barriosDeseadosArchivo2);
  Logger.log(`Datos filtrados después de procesar Corozal: ${JSON.stringify(datosFiltrados)}`);
  Logger.log(`Longitud de datosFiltrados después de Corozal: ${datosFiltrados.length}`);

  // Calcular el contador total
  let contadorTotal = 0;
  for (const barrio in conteoPorBarrio) {
    contadorTotal += conteoPorBarrio[barrio];
  }

  // Limitar la cantidad total de datos
  if (contadorTotal > cantidadTotalDatos) {
    datosFiltrados.splice(cantidadTotalDatos);
    contadorTotal = cantidadTotalDatos;
  }

  // Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios en Corozal: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro (NUEVO)
  Logger.log("Datos de la hoja 'Corozal':");
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  // Escribir datos del archivo en la hoja de destino
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
    Logger.log("Datos de Corozal escritos en la hoja de destino.");
  } else {
    Logger.log("No se encontraron datos de Corozal para escribir.");
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarriocCartagena() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
    "DANIEL LEMAITRE": "968713001",
    "SAN BERNARDO": "968713001",
    "SAN FRANCISCO": "968713001",
    "SANTA MARIA": "968713001",
    "7 DE AGOSTO": "968713001",
    "LAS BRISAS": "968813001",
    "9 DE ABRIL": "968813001",
    "LOS MANZANARES": "968813001",
    "JUNIN": "968813001",
    "LAS LOMAS": "968813001",
    "ALCIVIA": "968913001",
    "BOSTON": "968913001",
    "LA ESPERANZA": "968913001",
    "CANDELARIA": "968913001",
    "LA MARIA": "968913001",
    "JARDINES": "969013001",
    "EL EDUCADOR": "969013001",
    "MANUELA VERGARA": "969013001",
    "EL SILENCIO": "969013001",
    "SAN ISIDRO": "969113001",
    "BOSQUESITO": "969113001",
    "LOS CERROS": "969113001",
    "ALTO BOSQUE": "969113001",
    "ALBORNOZ": "969213001",
    "ARROZ BARATO": "969213001",
    "SUCRE": "969213001",
    "RAFAEL NUÑEZ": "969313001",
    "OLAYA RICAURTE": "969313001",
    "OLAYA CENTRAL": "969313001",
    "11 DE NOVIEMBRE": "969313001",
    "CHIQUINQUIRÁ": "969313001",
    "POLICARPA": "1508913001",
    "VILLA CARMEN": "1508913001",
    "LUIS CARLOS GALAN": "1508913001"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 6850;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 300;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Cartagena"); // Obtener la hoja "Cartagena"

  // 7. Obtener los datos de la hoja (CORREGIDO)
  // Cambiado para obtener datos de las columnas A a E (índices 0 a 4)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 5).getValues();

  // Registro para verificar el contenido y la longitud de datos
  Logger.log(`Datos extraídos: ${JSON.stringify(datos)}`);
  Logger.log(`Longitud de datos extraídos: ${datos.length}`);

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // Modificado para buscar en la columna E (índice 4)
      if (regexBarrio.test(fila[4])) {
        // Extraer los datos con NUMACRO
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioPuertoColombia() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
    "PRADOMAR": "971408573",
    "MIRAMAR": "971408573",
    "SILENCIO": "971408573",
    "COSTA AZUL": "971408573",
    "LOMA DE ORO": "971408573",
    "URB.MAR AZUL": "971408573",
    "SILENCIO NORTE": "971408573",
    "LA AURORA": "971408573",
    "CENTRO I": "971508573",
    "MUELLE": "971508573",
    "LA ROSITA": "971508573",
    "VISTAMAR": "971508573",
    "LOMA FRESCA": "971508573",
    "RISOTA": "971508573",
    "LA UNION": "971608573",
    "MARGARITAS": "971608573",
    "BRISAS DE PUERTO": "971608573",
    "VILLA ENCANTO": "971608573",
    "PASTRANA": "971608573",
    "SAN CARLOS": "971708573",
    "BELLOMAR": "971708573",
    "VICTORIA": "971708573",
    "BAJITO": "971708573",
    "CENTRO II": "971708573",
    "EL CARMEN": "971708573",
    "SOLIMAR": "971508573",
    "TAMARI": "971508573",
    "SAN LORENZO": "971508573",
    "SALGAR": "971508573",
    "PLAYAS DE SABANILLA": "971908573",
    "EL CAMPO": "971908573",
    "COUNTRY MAR": "971908573"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 12100;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 800;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Puerto Colombia"); // Obtener la hoja "Puerto Colombia"

  // Verificar si se encontró la hoja
  if (!hojaOrigen) {
    Logger.log("Error: No se encontró la hoja 'Puerto Colombia' en el archivo de origen.");
    return; // Detener la ejecución si no se encuentra la hoja
  }

  // 7. Obtener los datos de la hoja (CORREGIDO)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 5).getValues(); // Obtener datos de las columnas A a E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // Modificado para buscar en la columna E (índice 4)
      if (regexBarrio.test(fila[4])) {
        // Extraer los datos con NUMACRO
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioSoacha() {
  // IDs de los archivos de origen (datos consolidados)
  const archivoOrigenId1 = "15BYRNCcYrBxeqWWEas0eyes4dFXRBO_7jT0ypc0DbPQ";
  const archivoOrigenId2 = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
"VILLA FLOR": "535625754",
    "NEMESIS": "535625754",
    "COMPARTIR": "535625754",
    "VILLA SOFIA": "535625754",
    "VILLA LUZ": "535625754",
    "PABLO VI": "535625754",
    "LOS OLIVOS": "535625754",
    "VILLA ITALIA": "535625754",
    "EL ALTICO": "535725754",
    "ALTOS DE LA FLORIDA": "535725754",
    "CIEN FAMILIAS": "535725754",
    "LA PRADERA": "535725754",
    "DIVINO NIÑO": "535725754",
    "PORVENIR": "535725754",
    "RICARURTE": "535725754",
    "EL PARAISO": "535725754",
    "EL SOL": "535725754",
    "SAN CARLOS": "535725754",
    "SAN HUMBERTO": "535725754",
    "GALICIA": "535725754",
    "ESPAÑA": "535725754",
    "EL LIBERTADOR": "535725754"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 10100;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 450;

  // Función para procesar un archivo de origen (hoja "SOACHA")
  function procesarArchivo(archivoOrigenId, datosFiltrados, conteoPorBarrio, barriosSinDatos) {
    const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
    const hojaOrigen = archivoOrigen.getSheetByName("SOACHA"); // <---- ¡MODIFICACIÓN AQUÍ!

    if (!hojaOrigen) {
      Logger.log(`Advertencia: No se encontró la hoja "SOACHA" en el archivo con ID: ${archivoOrigenId}`);
      return;
    }

    const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, hojaOrigen.getLastColumn()).getValues();

    for (const barrio in barriosDeseados) {
      let contador = conteoPorBarrio[barrio] || 0; // Usar el contador existente o inicializarlo en 0
      const regexBarrio = new RegExp(barrio, 'i');
      const numacro = barriosDeseados[barrio];

      for (const fila of datos) {
        if (regexBarrio.test(fila[4])) {
          datosFiltrados.push([numacro, barrio, fila[3]]);
          conteoPorBarrio[barrio] = ++contador;

          if (contador >= cantidadPorBarrio) {
            break;
          }
        }
      }
    }
  }

  // Inicializar variables
  const datosFiltrados = [];
  const barriosSinDatos = Object.keys(barriosDeseados); // Inicializar con todos los barrios deseados
  const conteoPorBarrio = {};
  let contadorTotal = 0;

  // Procesar ambos archivos
  procesarArchivo(archivoOrigenId1, datosFiltrados, conteoPorBarrio, barriosSinDatos);
  procesarArchivo(archivoOrigenId2, datosFiltrados, conteoPorBarrio, barriosSinDatos); // Asumiendo que ambos archivos tienen la hoja "SOACHA"

  // Calcular el contador total
  for (const barrio in conteoPorBarrio) {
    contadorTotal += conteoPorBarrio[barrio];
    // Si se encontraron datos para un barrio, removerlo de la lista de barrios sin datos
    const index = barriosSinDatos.indexOf(barrio);
    if (index > -1) {
      barriosSinDatos.splice(index, 1);
    }
  }

  // Limitar la cantidad total de datos
  if (contadorTotal > cantidadTotalDatos) {
    datosFiltrados.splice(cantidadTotalDatos);
    contadorTotal = cantidadTotalDatos;
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen) (MODIFICADO)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados (MODIFICADO)
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro (NUEVO)
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioFusa() {
  // 1. ID del archivo de origen (datos consolidados) - ¡CORREGIDO!
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs
  const barriosDeseados = {
    "LUCERO": "972625290",
    "ROSAL": "972625290",
    "SAN ANTONIO": "972625290",
    "ESMERALDA": "972625290",
    "CARLOS LLERAS": "972625290",
    "CABAÑA": "972625290",
    "PROGRESO": "972625290",
    "FLORIDA": "972225290",
    "GALAN": "972225290",
    "OLAYA": "972225290",
    "GAITAN": "972225290",
    "LUXEMBURGO": "972225290",
    "SAN JORGE": "972425290",
    "MANDALAY": "972425290",
    "SANTA ANITA": "972425290",
    "MANILA": "972925290",
    "VILLA PARAISO": "972925290",
    "BALMORAL": "972925290",
    "SANTANDER": "972325290",
    "CEDRITOS": "972325290",
    "EMILIO SIERRA": "972325290",
    "PEKIN": "972325290",
    "ANTONIO NARIÑO": "972325290",
    "TEJAR": "972325290",
    "BONET": "972325290",
    "COBURGOS": "972725290",
    "VILLA DE LOS SUTAGAOS": "972325290",
    "POTOSI": "972725290",
    "VILLA PATRICIA": "972825290",
    "EBENEZER": "972825290",
    "GRAN COLOMBIA": "972825290",
    "CAMINO REAL": "972525290",
    "COMUNEROS": "972525290",
    "SAN FERNANDO": "972525290",
    "EL MIRADOR": "972525290",
    "FUSACATAN": "972525290"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 6200;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 250;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("FUSA"); // Obtener la hoja "FUSA"

  // Verificar si la hoja se encontró
  if (!hojaOrigen) {
    Logger.log(`Error: No se encontró la hoja llamada "FUSA" en el archivo con ID: ${archivoOrigenId}.`);
    return; // Detener la función si la hoja no se encuentra
  }

  // 7. Obtener los datos de la hoja (¡CORREGIDO para leer columnas D y E!)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, hojaOrigen.getLastColumn()).getValues(); // Obtener todos los datos para acceder a las columnas correctas

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // ¡Leer el barrio de la columna E (índice 4)!
      if (fila[4] && regexBarrio.test(fila[4])) {
        // ¡Extraer la dirección de la columna D (índice 3)!
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados en la hoja 'FUSA'.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioMonteria() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "15BYRNCcYrBxeqWWEas0eyes4dFXRBO_7jT0ypc0DbPQ";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs - ¡REEMPLAZADO!
  const barriosDeseados = {
    "LA NAVARRA": "2135523001",
    "EL PORTAL 1": "2135523001",
    "LA PALMA": "2135523001",
    "RANCHO GRANDE": "2135523001",
    "MI RANCHITO": "2135523001",
    "NUEVO HORIZONTE": "2135523001",
    "EL CAMPANO": "2135523001",
    "CASA FINCA": "2135523001",
    "CARACOLI": "2135523001",
    "BETANCI": "2135523001",
    "NUEVA HOLANDA": "2135523001",
    "EL PUENTE 1": "2135523001",
    "LA RIVERA": "2135523001",
    "REPUBLICA DE PANAMA": "2135523001",
    "EL DORADO": "2135523001",
    "EL POBLADO": "2135523001",
    "EL NISPERO": "2135523001",
    "LOS COLORES": "2135523001",
    "EL EBANO": "2135523001",
    "VILLA ARLETH": "2135523001",
    "EL PORTAL 2": "2135523001",
    "JERUSALEN": "2135523001",
    "NUEVA ESPERANZA": "2135523001",
    "VALLEJO": "2135523001",
    "LEVI": "2135523001",
    "BERLIN": "2135523001",
    "CAMPO ALEGRE": "2135623001",
    "CASITA NUEVA": "2135623001",
    "EL AMPARO": "2135623001",
    "EL BONGO": "2135623001",
    "EL ROSARIO": "2135623001",
    "EL TAMBO": "2135623001",
    "JUAN XXIII": "2135623001",
    "LA ALBORADA": "2135623001",
    "LA ESMERALDA": "2135623001",
    "LA ESPERANZA 2": "2135623001",
    "LAS VIÑAS": "2135623001",
    "MAGDALENA": "2135623001",
    "EL MINUTO DE DIOS": "2135623001",
    "RIO DE JANEIRO": "2135623001",
    "EL PUENTE 2": "2135623001",
    "MANUEL ANTONIO BUELVAS": "2135623001",
    "VILLAREAL": "2135623001",
    "VILLA LUZ": "2135623001",
    "VILLA NUEVA": "2135623001",
    "MANUEL JIMENEZ": "2135623001",
    "BALBOA": "2135723001",
    "CATORCE DE JULIO": "2135723001",
    "CHAMBACU": "2135723001",
    "CHUCHURUBI": "2135723001",
    "EL COLISEO": "2135723001",
    "COLON": "2135723001",
    "COSTA DE ORO": "2135723001",
    "CENTRO": "2135723001",
    "EL EDEN": "2135723001",
    "LA CEIBA": "2135723001",
    "LA JULIA": "2135723001",
    "LA VICTORIA": "2135723001",
    "LOS ALAMOS": "2135723001",
    "MONTERIA MODERNO": "2135723001",
    "NARIÑO": "2135723001",
    "OBRERO": "2135723001",
    "OSPINA PEREZ": "2135723001",
    "PASATIEMPO": "2135723001",
    "PUEBLO NUEVO": "2135723001",
    "RISARALDA": "2135723001",
    "SANTA CLARA": "2135723001",
    "TACASUAN": "2135723001",
    "LACHARME": "2135723001",
    "URBINA": "2135723001"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 8000;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 300;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Monteria"); // Obtener la hoja "Monteria"

  // Verificar si la hoja se encontró
  if (!hojaOrigen) {
    Logger.log(`Error: No se encontró la hoja llamada "Monteria" en el archivo con ID: ${archivoOrigenId}.`);
    return; // Detener la función si la hoja no se encuentra
  }

  // 7. Obtener los datos de la hoja (¡CORREGIDO para leer columnas C y D!)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, hojaOrigen.getLastColumn()).getValues(); // Obtener todos los datos para acceder a las columnas correctas

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // ¡Leer el barrio de la columna D (índice 3)!
      if (fila[3] && regexBarrio.test(fila[3])) {
        // ¡Extraer la dirección de la columna C (índice 2)!
        datosFiltrados.push([numacro, fila[3], fila[2]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados en la hoja 'Monteria'.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioSahagun() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs - ¡REEMPLAZADO con MACSH!
  const barriosDeseados = {
    "EL CARMEN": "563022660",
    "SAN PEDRO": "563022660",
    "EL PRADO": "563022660",
    "SAN ROQUE": "563022660",
    "GUAYABAL": "563022660",
    "LAS MERCEDES": "563022660",
    "SAN RAFAEL": "563022660",
    "LA CRUZ": "563022660",
    "PORVENIR": "563022660",
    "PORTAL DE SAN JUAN": "563022660",
    "COROCITO": "563022660",
    "SIMON BOLIVAR": "563022660",
    "SAN ISIDRO": "563022660",
    "LOS LAURELES": "563022660",
    "MARIA AUXILIADORA": "563022660",
    "BELALCAZAR": "563022660",
    "EL CENTRO": "563022660",
    "PLAYA RICA": "563022660",
    "BOSQUE CENTRO": "563022660",
    "EL TRIUNFO": "563022660",
    "MIRAMAR": "563022660",
    "LA GUA": "563022660",
    "COREA": "563022660",
    "VENECIA": "563022660",
    "SANTA LUCIA": "563022660",
    "COSTA NORTE": "563022660"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 4000;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 300;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Sahagun"); // Obtener la hoja "Sahagun"

  // Verificar si la hoja se encontró
  if (!hojaOrigen) {
    Logger.log(`Error: No se encontró la hoja llamada "Sahagun" en el archivo con ID: ${archivoOrigenId}.`);
    return; // Detener la función si la hoja no se encuentra
  }

  // 7. Obtener los datos de la hoja (¡CORREGIDO para leer columnas D y E!)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, hojaOrigen.getLastColumn()).getValues(); // Obtener todos los datos para acceder a las columnas correctas

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // ¡Leer el barrio de la columna E (índice 4)!
      if (fila[4] && regexBarrio.test(fila[4])) {
        // ¡Extraer la dirección de la columna D (índice 3)!
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados en la hoja 'Sahagun'.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioBarranquilla() {
  // IDs de los archivos de origen (datos consolidados)
  const archivoOrigenId1 = "15BYRNCcYrBxeqWWEas0eyes4dFXRBO_7jT0ypc0DbPQ";
  const archivoOrigenId2 = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
    "LAS ESTRELLAS": "969408001",
    "PASTORAL SOCIAL": "969408001",
    "LOS OLIVOS I": "969408001",
    "EL RUBI": "969408001",
    "EL PORFIN": "969408001",
    "MEQUEJO": "969408001",
    "CARLOS MEISEL": "969408001",
    "LA MANGA": "969408001",
    "LOS OLIVOS II": "969508001",
    "LA PRADERA": "969508001",
    "EL PUEBLO": "969508001",
    "CARIBE VERDE": "969508001",
    "JUANMINA": "969508001",
    "LOS ANGELES": "969508001",
    "BERNARDO HOYOS": "969508001",
    "VILLA SANCARLOS": "969608001",
    "VILLA SAN PEDRO": "969608001",
    "SAN LUIS": "969608001",
    "LAS GARDENIAS": "969608001",
    "SANTAMARIA": "969608001",
    "SIETE DE ABRIL": "969608001",
    "CAMPO ALEGRE": "969708001",
    "LOS NOGALES": "969708001",
    "NUEVO HORIZONTE": "969708001",
    "LA CUMBRE": "969708001",
    "LA CAMPIÑA": "969708001",
    "CIUDAD JARDIN": "969708001",
    "LA PAZ": "969808001",
    "CIUDAD MODESTO": "969808001",
    "EVARISTO SOURDIS": "969808001",
    "SIETE DE AGOSTO": "969808001",
    "NUEVA COLOMBIA": "969808001",
    "LA ESMERALDA": "969808001",
    "EL EDEN": "969808001",
    "KALAMARY": "969808001",
    "REBOLO": "969908001",
    "LA LUZ": "969908001",
    "LAS NIEVES": "969908001",
    "SIMON BOLIVAR": "969908001",
    "OLAYA": "970008001",
    "LOS PINOS": "970008001",
    "EL SILENCIO": "970008001",
    "LOS ANDES": "970008001",
    "MERCEDES SUR": "970008001",
    "SAN FELIPE": "970008001",
    "LAS COLINAS": "970008001",
    "NUEVA GRANADA": "970008001",
    "LUCERO": "970008001",
    "EL RECREO": "970108001",
    "BOSTON": "970108001",
    "BETANIA": "970108001",
    "LAS DELICIAS": "970108001",
    "LAS MERCEDES": "970108001",
    "MIRAMAR": "970108001",
    "EL PRADO": "970108001",
    "EL BOSQUE": "970208001",
    "LAS MALVINAS": "970208001",
    "LOS ROSALES": "970208001",
    "CORDIALIDAD": "970208001",
    "CALIFORNIA": "970208001",
    "LA GLORIA": "970208001",
    "CIUDADELA": "970208001",
    "LA SIERRITA": "970308001",
    "CARRIZAL": "970308001",
    "LAS AMERICAS": "970308001",
    "EL SANTUARIO": "970308001",
    "BUENOS AIRES": "970308001"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 22600;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 420;

  // Función para procesar un archivo de origen (hoja "BARRANQUILLA")
  function procesarArchivo(archivoOrigenId, datosFiltrados, conteoPorBarrio, barriosSinDatos) {
    const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
    const hojaOrigen = archivoOrigen.getSheetByName("BARRANQUILLA"); // <---- ¡MODIFICACIÓN AQUÍ!

    if (!hojaOrigen) {
      Logger.log(`Advertencia: No se encontró la hoja "BARRANQUILLA" en el archivo con ID: ${archivoOrigenId}`);
      return;
    }

    const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, hojaOrigen.getLastColumn()).getValues();

    for (const barrio in barriosDeseados) {
      let contador = conteoPorBarrio[barrio] || 0; // Usar el contador existente o inicializarlo en 0
      const regexBarrio = new RegExp(barrio, 'i');
      const numacro = barriosDeseados[barrio];

      for (const fila of datos) {
        if (regexBarrio.test(fila[4])) {
          datosFiltrados.push([numacro, barrio, fila[3]]);
          conteoPorBarrio[barrio] = ++contador;

          if (contador >= cantidadPorBarrio) {
            break;
          }
        }
      }
    }
  }

  // Inicializar variables
  const datosFiltrados = [];
  const barriosSinDatos = Object.keys(barriosDeseados); // Inicializar con todos los barrios deseados
  const conteoPorBarrio = {};
  let contadorTotal = 0;

  // Procesar ambos archivos
  procesarArchivo(archivoOrigenId1, datosFiltrados, conteoPorBarrio, barriosSinDatos);
  procesarArchivo(archivoOrigenId2, datosFiltrados, conteoPorBarrio, barriosSinDatos); // Asumiendo que ambos archivos tienen la hoja "BARRANQUILLA"

  // Calcular el contador total
  for (const barrio in conteoPorBarrio) {
    contadorTotal += conteoPorBarrio[barrio];
    // Si se encontraron datos para un barrio, removerlo de la lista de barrios sin datos
    const index = barriosSinDatos.indexOf(barrio);
    if (index > -1) {
      barriosSinDatos.splice(index, 1);
    }
  }

  // Limitar la cantidad total de datos
  if (contadorTotal > cantidadTotalDatos) {
    datosFiltrados.splice(cantidadTotalDatos);
    contadorTotal = cantidadTotalDatos;
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen) (MODIFICADO)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados (MODIFICADO)
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro (NUEVO)
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioFlandes() { // Cambié el nombre de la función para mayor claridad
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
    "LAS QUINTAS": "2187273275",
    "APROVITEF": "2187273275",
    "OBRERO": "2187273275",
    "LOS ALMENDROS": "2187273275",
    "LLERAS": "2187273275",
    "IQUEIMA": "2187273275",
    "ALFONSO LOPEZ": "2187373275",
    "BILBAO": "2187373275",
    "LIBERTADOR": "2187373275",
    "VILLA MAGDALENA": "2187473275",
    "ORQUIDEAS": "2187473275",
    "VILLA DEL RIO": "2187473275",
    "CANCUN": "2187473275",
    "MIRADOR DE LA ESPERANZA": "2187473275",
    "LA CEIBA": "2187473275",
    "VILLA ESPERANZA": "2187473275", // Nota: "VILLA MAGDALENA" ya está, no la duplico a menos que sea un NUMACRO diferente.
    "GAITAN": "2187573275",
    "CENTRO": "2187573275",
    "SAN LUIS": "2187573275",
    "LA CAPILLA": "2187573275",
    "LAS ROSAS": "2187573275",
    "LA PAZ": "2187573275",
    "ESPERANZA": "2187573275",
    "TRIANA": "2187573275"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 3400;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 170;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Flandes"); // <--- ¡CAMBIADO A "Flandes"!

  // Verificar si se encontró la hoja
  if (!hojaOrigen) {
    Logger.log("Error: No se encontró la hoja 'Flandes' en el archivo de origen.");
    return; // Detener la ejecución si no se encuentra la hoja
  }

  // 7. Obtener los datos de la hoja (CORREGIDO)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 5).getValues(); // Obtener datos de las columnas A a E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // Modificado para buscar en la columna E (índice 4)
      if (regexBarrio.test(fila[4])) {
        // Extraer los datos con NUMACRO
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioFacatativa() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
    "BRASILIA": "536525269",
    "LOS MOLINOS": "536525269",
    "RINCON DE FACATATIVA": "536525269",
    "LOS ROBLES": "536525269",
    "MARIA PAULA": "536525269",
    "SAN PEDRO": "536525269",
    "LAURELES": "536525269",
    "LA ESMERALDA": "536525269",
    "LA CONCEPCION": "536525269",
    "LAS QUINTAS": "536525269",
    "SANTA ISABEL": "536525269",
    "VILLA SAJONIA": "536525269",
    "PENSILVANIA": "536525269",
    "ALAMOS": "536525269",
    "LOS OLIVOS": "536525269",
    "REMANZO DEL CACIQUE": "536525269",
    "SANTA": "536525269",
    "EL LLANITO": "536525269",
    "GIBRALTAR": "536525269",
    "LLANO POPULAR": "536525269",
    "BERLIN": "536525269",
    "LAS ACACIAS": "536525269",
    "EL BOSQUE": "536625269",
    "NUEVA HOLANDA": "536625269",
    "ZAMBRANO": "536625269",
    "SANTA ROSA": "536625269",
    "LAS PIEDRAS": "536625269",
    "SIETE DE AGOSTO": "536625269",
    "LA FLORIDA": "536625269",
    "EL JARDIN": "536625269",
    "CARTAGENITA": "536625269"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 3900;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 140;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Facatativa"); // Mantener "Facatativa"

  // Verificar si se encontró la hoja
  if (!hojaOrigen) {
    Logger.log("Error: No se encontró la hoja 'Facatativa' en el archivo de origen.");
    return; // Detener la ejecución si no se encuentra la hoja
  }

  // 7. Obtener los datos de la hoja (CORREGIDO)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 5).getValues(); // Obtener datos de las columnas A a E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // Modificado para buscar en la columna E (índice 4)
      if (regexBarrio.test(fila[4])) {
        // Extraer los datos con NUMACRO
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioValledupar() { // Cambié el nombre de la función para mayor claridad
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
    "5 DE NOVIEMBRE": "2465320001",
    "SANTA RITA": "2465320001",
    "LUIS CARLOS GALAN": "2465320001",
    "SAN FRANCISCO DE ASIS": "2465320001",
    "VILLA CLARA": "2465320001",
    "ROSAMERY": "2465320001",
    "CANDELARIA SUR": "2465320001",
    "SAN ANTONIO": "2465320001",
    "LAS PALMAS": "2465320001",
    "SAN JORGE": "2465320001",
    "LA ESPERANZA": "2465420001",
    "VILLA MONICA": "2465420001",
    "IRACAL": "2465420001",
    "EL AMPARO": "2465420001",
    "ICHAGUA": "2465420001",
    "VILLA ERIKA": "2465420001",
    "LOS CORTIJOS": "2465420001",
    "VILLA CAREL": "2465420001",
    "VILLA FANNY": "2465420001",
    "VILLA LUCY": "2465420001",
    "LOS MUSICOS": "2465420001",
    "PONTEVEDRA": "2465520001",
    "SAN CARLOS": "2465520001",
    "CIUDAD JARDIN": "2465520001",
    "SERRANILLA": "2465520001",
    "VILLALBA": "2465520001",
    "LOS CAMPANOS": "2465520001",
    "SANTA ROSALIA": "2465520001",
    "CASA BLANCA": "2465520001",
    "LOS ANGELES": "2465520001",
    "PIAMONTE": "2465520001",
    "COSTA AZUL": "2465520001",
    "ARENASAIN": "2465520001",
    "PASADENA": "2465520001",
    "RIO BADILLO": "2465520001",
    "VILLA VALERIA": "2465520001",
    "LOS ROSALES": "2465520001",
    "SAN PEDRO": "2465520001",
    "PORTAL DEL ROSARIO": "2465520001",
    "LOS CORALES": "2465520001",
    "VILLA CASTRO": "2465620001",
    "SAN JUAN": "2465620001",
    "SANTO DOMINGO": "2465620001",
    "9 DE MARZO": "2465620001",
    "NUEVA COLOMBIA": "2465620001",
    "PESCADITO": "2465620001",
    "LA ESPERANZA ORIENTE": "2465620001",
    "11 DE NOVIEMBRE": "2465620001",
    "ALTA GRACIA": "2465620001",
    "PARAISO": "2465620001",
    "ZAPATO EN MANO": "2465620001",
    "LORENZO MORALES": "2465720001",
    "CHIRIQUI NORTE": "2465720001",
    "LA PRIMAVERA": "2465720001",
    "EFRAIN QUINTERO": "2465720001",
    "VILLA URIBE": "2465720001",
    "ARMONIA": "2465720001",
    "LOS GUAYACANES": "2465720001",
    "ALCALA": "2465720001",
    "PARQUE LA PRIMAVERA": "2465720001",
    "TORRES DE VILLA DEL ROSARIO": "2465720001",
    "LOS COCOS": "2465820001",
    "MAYALES ETAPA 1": "2465820001",
    "LA RIVERA": "2465820001",
    "DOÑA CLARA": "2465820001",
    "SAN FERNANDO": "2465820001",
    "20 DE MARZO": "2465820001",
    "DON FELIPE": "2465820001",
    "ZONA INDUSTRIAL": "2465820001",
    "CASAS CAMPO": "2465820001",
    "GEORGE DANGOND": "2465820001"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 6100;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 200;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Valledupar"); // <--- ¡CAMBIADO A "Valledupar"!

  // Verificar si se encontró la hoja
  if (!hojaOrigen) {
    Logger.log("Error: No se encontró la hoja 'Valledupar' en el archivo de origen.");
    return; // Detener la ejecución si no se encuentra la hoja
  }

  // 7. Obtener los datos de la hoja (CORREGIDO)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 5).getValues(); // Obtener datos de las columnas A a E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // Modificado para buscar en la columna E (índice 4)
      if (regexBarrio.test(fila[4])) {
        // Extraer los datos con NUMACRO
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioCodazzi() { // Cambié el nombre de la función para mayor claridad
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
    "5 DE DICIEMBRE": "1360920550",
    "HERNAN GOMEZ": "1360920550",
    "BUENOS AIRES": "1360920550",
    "TRUJILLO": "1360920550",
    "OBRERO": "1360920550",
    "11 DE NOVIEMBRE": "1360920550",
    "ATANACIO GIRARDOT": "1360920550",
    "1 DE MAYO": "1360920550",
    "LAS FLORES": "1360920550",
    "AIDA QUINTERO": "1360920550",
    "NUEVA ESPERANZA": "1360920550",
    "LONDOÑO": "1360920550",
    "VILLA ELISA": "1360920550",
    "SAN VICENTE": "1361020550",
    "LA VICTORIA": "1361020550",
    "LA FRONTERA": "1361020550",
    "SAN RAMON": "1361020550",
    "RODRIGO ESCORSIA": "1361020550",
    "BARRIO NUEVO": "1361020550",
    "EL JUGUETE": "1361020550",
    "15 DE NOVIEMBRE": "1361020550",
    "POLICARPA SALAVARRIETA": "1361020550",
    "LAS PALMERAS": "1361020550",
    "CAMILO TORRES": "1361120550",
    "CANDELARIA": "1361120550",
    "LAS MARGARITAS 1": "1361120550",
    "RAMON FERNANDEZ": "1361120550",
    "6 DE MARZO": "1361120550",
    "ANTILLANA 1": "1361120550",
    "ANTILLANA 2": "1361120550",
    "EL LIBANO": "1361120550",
    "EL PARAISO": "1361120550",
    "LAS MARGARITAS 2": "1361120550",
    "VILLA VAQUERO": "1361120550",
    "VILLA EDUARDO": "1361120550"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 5000;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 300;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("CODAZZI"); // <--- ¡CAMBIADO A "CODAZZI"!

  // Verificar si se encontró la hoja
  if (!hojaOrigen) {
    Logger.log("Error: No se encontró la hoja 'CODAZZI' en el archivo de origen.");
    return; // Detener la ejecución si no se encuentra la hoja
  }

  // 7. Obtener los datos de la hoja (CORREGIDO)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 5).getValues(); // Obtener datos de las columnas A a E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // Modificado para buscar en la columna E (índice 4)
      if (regexBarrio.test(fila[4])) {
        // Extraer los datos con NUMACRO
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioBecerril() { // Se cambió el nombre de la función para ser más claro
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (ACTUALIZADO)
  const barriosDeseados = {
    "CENTRO": "2465020045",
    "URBANIZACION MARACAS": "2465020045",
    "11 DE ABRIL": "2465020045",
    "ALTO PRADO": "2465020045",
    "VILLA INES": "2465020045",
    "7 DE AGOSTO": "2465020045",
    "URBANIZACION VILLA LUZ": "2465020045",
    "IDEMA": "2465120045",
    "TRUJILLO": "2465120045",
    "SANTO TOMAS": "2465120045",
    "LA CANDELARIA": "2465120045",
    "LA ESPERANZA": "2465120045",
    "6 DE ENERO": "2465120045",
    "DIVINO NIÑO": "2465120045",
    "VILLALBA": "2465120045",
    "LOS MANGUITOS": "2465220045",
    "LOS CAMPANOS": "2465220045",
    "SAN LUIS": "2465220045",
    "SAN MARTIN": "2465220045",
    "SAN JOSE": "2465220045",
    "EL CARMEN": "2465220045"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 3400;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 300;

  // 6. Obtener el archivo de origen y la hoja (CORREGIDO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("BECERRIL"); // <--- ¡CAMBIADO A "BECERRIL"!

  // Verificar si se encontró la hoja
  if (!hojaOrigen) {
    Logger.log("Error: No se encontró la hoja 'BECERRIL' en el archivo de origen.");
    return; // Detener la ejecución si no se encuentra la hoja
  }

  // 7. Obtener los datos de la hoja (CORREGIDO)
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 5).getValues(); // Obtener datos de las columnas A a E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  // Extraer datos de cada barrio
  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      // Modificado para buscar en la columna E (índice 4)
      if (regexBarrio.test(fila[4])) {
        // Extraer los datos con NUMACRO
        datosFiltrados.push([numacro, fila[4], fila[3]]); // NUMACRO, Barrio, Dirección

        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) {
          break;
        }
      }
    }

    if (contador === 0) {
      barriosSinDatos.push(barrio);
    }

    contadorTotal += contador;

    if (contadorTotal >= cantidadTotalDatos) {
      break;
    }
  }

  // 9. Obtener el archivo de destino y la hoja
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Escribir los encabezados en la primera fila (si no existen)
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir los datos filtrados
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datosFiltrados.length, datosFiltrados[0].length).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Mostrar los barrios sin datos
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  // Mostrar la cantidad de datos por barrio en el registro
  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioLorica() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "15BYRNCcYrBxeqWWEas0eyes4dFXRBO_7jT0ypc0DbPQ";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (los mismos que ya definiste)
  const barriosDeseados = {
    "INGLES": "532711001",
    "BRAVO": "532711001",
    "PAEZ": "532711001",
    "MURILLO TORO": "532711001",
    "QUIROGA SUR": "532711001",
    "QUIROGA CENTRAL": "532711001",
    "CLARET": "532711001",
    "LIBERTADOR": "532711001",
    "CENTENARIO": "532711001",
    "SANTIAGO PEREZ": "532711001",
    "OLAYA": "532711001",
    "EL PLAYON": "532811001",
    "EL SOCORRO": "532811001",
    "SANTA LUCIA": "532811001",
    "SAN JORGE SUR": "532811001",
    "MARCO FIDEL SUAREZ": "532811001",
    "EL CONSUELO": "532811001",
    "MOLINOS DEL SUR": "532911001",
    "PUERTO RICO": "532911001",
    "PRADERA SUR": "532911001",
    "CALLEJON SANTA BARBARA": "532911001",
    "VILLA GLADYS": "532911001",
    "RINCON DE VENECIA": "533011001",
    "NUEVO MUZU": "533011001",
    "LAGUNETA": "533011001",
    "FATIMA": "533011001",
    "SAN VICENTE FERRER": "533011001",
    "EL CARMEN": "533011001",
    "TUNJUELITO": "533011001",
    "SAN CARLOS": "533011001",
    "LA FRAGUITA": "533111001",
    "CIUDAD JARDIN SUR": "533111001",
    "CARACAS": "533111001",
    "CIUDAD BERNA": "533111001",
    "POLICARPA SALAVARRIETA": "533111001",
    "EDUARDO FREY": "533111001",
    "SANTANDER SUR": "533111001",
    "GALAN": "533211001",
    "OSPINA PÉREZ": "533211001",
    "MUZU": "533211001",
    "MILENTA": "533211001",
    "EL TEJAR": "533211001",
    "CARABELAS": "533211001",
    "PONDEROSA": "533211001",
    "SANTA MATILDE": "533211001",
    "EL SOL": "533211001",
    "ALCALA": "533211001",
    "CORKIDI": "533211001"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 27900;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 600;

  // 6. Obtener el archivo de origen y la hoja (MODIFICADO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Lorica"); // Ahora busca en "Lorica"

  // 7. Obtener los datos de la hoja
  const datos = hojaOrigen.getRange(2, 1, hojaOrigen.getLastRow() - 1, 2).getValues(); // Columnas A y B

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      if (regexBarrio.test(fila[1])) {
        datosFiltrados.push([numacro, fila[1], fila[0]]); // NUMACRO, Barrio, Dirección
        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) break;
      }
    }

    if (contador === 0) barriosSinDatos.push(barrio);

    contadorTotal += contador;
    if (contadorTotal >= cantidadTotalDatos) break;
  }

  // 9. Archivo de destino
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Encabezados
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir datos
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(
      hojaDestino.getLastRow() + 1,
      1,
      datosFiltrados.length,
      datosFiltrados[0].length
    ).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Reporte en logs
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioMontelibano() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (los mismos que ya definiste)
  const barriosDeseados = {
    "LA FE": "563223466",
    "LA ENCANTADA": "563223466",
    "SAN ATEREO": "563223466",
    "CRISTO REY": "563223466",
    "AÑONUEVO": "563223466",
    "LAS VEGAS": "563223466",
    "LAS FLORES": "563223466",
    "EL PEPO": "563223466",
    "JOSE GALAN": "563223466",
    "CENTRO": "563223466"
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 1900;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 300;

  // 6. Obtener el archivo de origen y la hoja (MODIFICADO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Montelibano"); // Ahora busca en "Montelibano"

  // 7. Obtener los datos de la hoja
  const datos = hojaOrigen.getRange(2, 4, hojaOrigen.getLastRow() - 1, 2).getValues(); // Columnas D y E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      if (regexBarrio.test(fila[1])) {
        datosFiltrados.push([numacro, fila[1], fila[0]]); // NUMACRO, Barrio, Dirección
        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) break;
      }
    }

    if (contador === 0) barriosSinDatos.push(barrio);

    contadorTotal += contador;
    if (contadorTotal >= cantidadTotalDatos) break;
  }

  // 9. Archivo de destino
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Encabezados
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir datos
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(
      hojaDestino.getLastRow() + 1,
      1,
      datosFiltrados.length,
      datosFiltrados[0].length
    ).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Reporte en logs
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioSanPelayo() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (los mismos que ya definiste)
  const barriosDeseados = {
    "CENTRO": "563123686",
    "EL PORVENIR": "563123686",
    "EL PROGRESO": "563123686",
    "LA ESPERANZA": "563123686",
    "LA RIVERA": "563123686",
    "SAN PELAYO": "563123686",
    "SANTA LUCIA": "563123686",
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 1400;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 400;

  // 6. Obtener el archivo de origen y la hoja (MODIFICADO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("San Pelayo"); // Ahora busca en "San Pelayo"

  // 7. Obtener los datos de la hoja
  const datos = hojaOrigen.getRange(2, 4, hojaOrigen.getLastRow() - 1, 2).getValues(); // Columnas D y E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      if (regexBarrio.test(fila[1])) {
        datosFiltrados.push([numacro, fila[1], fila[0]]); // NUMACRO, Barrio, Dirección
        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) break;
      }
    }

    if (contador === 0) barriosSinDatos.push(barrio);

    contadorTotal += contador;
    if (contadorTotal >= cantidadTotalDatos) break;
  }

  // 9. Archivo de destino
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Encabezados
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir datos
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(
      hojaDestino.getLastRow() + 1,
      1,
      datosFiltrados.length,
      datosFiltrados[0].length
    ).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Reporte en logs
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
function filtrarDatosPorBarrioChinu() {
  // 1. ID del archivo de origen (datos consolidados)
  const archivoOrigenId = "1CyaVcSuB7ul8RM783SguB4nt1DO4Kb56I25IrAfJ3r0";

  // 2. ID del archivo de destino (nueva base de datos)
  const archivoDestinoId = "1eF1K-t4KQk9IjnpX9mgaGngnQ8RpXo5k4dI9Rmdl34w";

  // 3. Barrios y NUMACROs (los mismos que ya definiste)
  const barriosDeseados = {
    "CENTRO": "562923182",
    "MEDIA LUNA": "562923182",
    "SAN FRANCISCO": "562923182",
    "SAN SIMON": "562923182",
    "SANTA LUCIA": "562923182",
  };

  // 4. Cantidad total de datos a extraer (Límite)
  const cantidadTotalDatos = 2100;

  // 5. Cantidad de datos a extraer por barrio (Límite)
  const cantidadPorBarrio = 600;

  // 6. Obtener el archivo de origen y la hoja (MODIFICADO)
  const archivoOrigen = SpreadsheetApp.openById(archivoOrigenId);
  const hojaOrigen = archivoOrigen.getSheetByName("Chinu"); // Ahora busca en "Chinu"

  // 7. Obtener los datos de la hoja
  const datos = hojaOrigen.getRange(2, 4, hojaOrigen.getLastRow() - 1, 2).getValues(); // Columnas D y E

  // 8. Leer los datos y filtrar por barrio con límite
  const datosFiltrados = [];
  const barriosSinDatos = [];
  let contadorTotal = 0;

  // Contador de datos por barrio
  const conteoPorBarrio = {};

  for (const barrio in barriosDeseados) {
    let contador = 0;
    const regexBarrio = new RegExp(barrio, 'i');
    const numacro = barriosDeseados[barrio];

    for (const fila of datos) {
      if (regexBarrio.test(fila[1])) {
        datosFiltrados.push([numacro, fila[1], fila[0]]); // NUMACRO, Barrio, Dirección
        conteoPorBarrio[barrio] = (conteoPorBarrio[barrio] || 0) + 1;
        contador++;
        if (contador >= cantidadPorBarrio) break;
      }
    }

    if (contador === 0) barriosSinDatos.push(barrio);

    contadorTotal += contador;
    if (contadorTotal >= cantidadTotalDatos) break;
  }

  // 9. Archivo de destino
  const archivoDestino = SpreadsheetApp.openById(archivoDestinoId);
  const hojaDestino = archivoDestino.getActiveSheet();

  // 10. Encabezados
  if (hojaDestino.getLastRow() === 0) {
    hojaDestino.getRange(1, 1, 1, 3).setValues([["NUMACRO", "BARRIO", "DIRECCION"]]);
  }

  // 11. Escribir datos
  if (datosFiltrados.length > 0) {
    hojaDestino.getRange(
      hojaDestino.getLastRow() + 1,
      1,
      datosFiltrados.length,
      datosFiltrados[0].length
    ).setValues(datosFiltrados);
  } else {
    Logger.log("Error: No se encontraron datos para los barrios especificados.");
  }

  // 12. Reporte en logs
  if (barriosSinDatos.length > 0) {
    Logger.log("No se encontraron datos para los siguientes barrios: " + barriosSinDatos.join(", "));
  }

  for (const barrio in conteoPorBarrio) {
    Logger.log(`Barrio ${barrio}: ${conteoPorBarrio[barrio]} datos`);
  }

  Logger.log("Datos filtrados y guardados en: " + archivoDestino.getUrl());
  Logger.log("Cantidad total de datos extraídos: " + contadorTotal);
}
