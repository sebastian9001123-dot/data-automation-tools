# 🖼️ Conversor de Imágenes a PDF – v1.0

**Autor:** Sebastián Ramírez  
**Tecnologías:** Python, Tkinter, ReportLab, Pillow (PIL)  
**Tipo de aplicación:** Herramienta de escritorio (GUI)

---

## 🧩 Descripción del proyecto

El **Conversor de Imágenes a PDF** es una aplicación de escritorio desarrollada en **Python**, que permite al usuario **seleccionar varias imágenes, reordenarlas manualmente y exportarlas como un único archivo PDF**.

Su diseño se centra en la **usabilidad, rapidez y control total del orden de páginas**, ofreciendo una interfaz limpia e intuitiva con vistas en miniatura, campos de reordenamiento y confirmaciones visuales.

La aplicación fue desarrollada desde cero utilizando únicamente **librerías estándar y de uso libre** (sin frameworks externos), priorizando la funcionalidad, estabilidad y facilidad de uso.

---

## ⚙️ Funcionalidades principales

- **Selección múltiple de imágenes** (`.jpg`, `.jpeg`, `.png`) desde el explorador de archivos.  
- **Vista previa de miniaturas** con numeración de páginas.  
- **Reordenamiento manual**: el usuario puede escribir el número de página deseado para cada imagen.  
- **Eliminación individual** de imágenes antes de exportar.  
- **Exportación directa a PDF** con ajuste automático de tamaño y centrado.  
- **Limpieza rápida** de la lista de imágenes con un solo clic.  
- **Desplazamiento vertical** con soporte para mouse y trackpad.  
- **Mensajes de confirmación y validación** para evitar errores en el orden o exportación.  

---

## 🧠 Aspectos técnicos destacados

- Interfaz desarrollada con **Tkinter** y widgets de **ttk** para un estilo moderno y nativo.  
- Generación de PDFs con **ReportLab**, ajustando automáticamente las dimensiones de cada imagen a tamaño carta.  
- Uso de **Pillow (PIL)** para crear miniaturas y optimizar la visualización de imágenes.  
- Implementación de un **ordenamiento natural inteligente** (por número dentro del nombre del archivo).  
- Control completo de eventos de ratón y teclado para un desplazamiento fluido.  
- Arquitectura orientada a clases (`ImageToPDFApp`) para facilitar mantenimiento y expansión futura.  

---

## 🚀 Cómo ejecutar el proyecto

1. Asegúrate de tener **Python 3.x** instalado.  
2. Instala las dependencias necesarias:

   ```bash
   pip install pillow reportlab
