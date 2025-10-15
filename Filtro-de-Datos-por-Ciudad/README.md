# 📊 Sistema de Filtrado de Datos por Ciudad

Este módulo contiene un conjunto de funciones automatizadas creadas en **Google Apps Script (JavaScript)** para filtrar datos por barrios de diferentes ciudades y consolidarlos en un archivo de destino.

Cada archivo **Funcion** corresponde a una ciudad y puede ejecutarse individualmente desde Google Apps Script.

---

## 🧩 Funcionalidades
- Filtra registros por nombre de barrio y asigna un código único (NUMACRO).  
- Procesa automáticamente miles de filas desde archivos de origen en Google Drive.  
- Exporta los resultados filtrados a una hoja de cálculo de destino.  
- Registra el progreso, barrios procesados y barrios sin datos en consola.  
- Permite seleccionar la ciudad deseada simplemente ejecutando la función correspondiente.  

---

## 🗂️ Origen de los datos
Los archivos analizados por el script son **bases de datos creadas previamente en Hojas de Cálculo de Google**.  
Estas bases son **previamente limpiadas y organizadas** para garantizar la precisión y eficiencia del proceso de filtrado.  
De esta forma, el sistema trabaja únicamente con información validada y estructurada, evitando duplicados o inconsistencias.

---

## 🏙️ Ciudades incluidas
- Bogotá  
- Soacha  
- Montería  
- Fusa  
- Sahagún  
- Cartagena  
- Puerto Colombia  
- Corozal  
- Honda  
- ... (y otras)

---
