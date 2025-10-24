import os
import tkinter as tk
from tkinter import filedialog, ttk, messagebox
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter 
from PIL import Image, ImageTk
import re 

# --- CONFIGURACIÓN DEL PDF ---
PAGE_WIDTH, PAGE_HEIGHT = letter

# FUNCIÓN DE ORDEN NATURAL
def sort_key_natural(file_path):
    filename = os.path.basename(file_path)
    numbers = re.findall(r'\d+', filename)
    
    if numbers:
        primary_key = int(numbers[0])
        secondary_key = filename
        return (0, primary_key, secondary_key)
    else:
        return (1, filename)


class ImageToPDFApp:
    def __init__(self, master):
        self.master = master
        master.title("Conversor Rápido de Imágenes a PDF")
        
        self.image_data = []
        self.img_refs = []
        self.order_vars = []

        self.create_widgets()
        
    def create_widgets(self):
        
        # --- Marco Superior (Título y Botones) ---
        top_frame = ttk.Frame(self.master, padding="10")
        top_frame.pack(fill='x')

        # TÍTULO DE LA APLICACIÓN
        ttk.Label(top_frame, text="CONVERSOR v1.0", font=("Arial", 16, "bold")).pack(pady=(0, 15), fill='x', padx=10, anchor='center')

        # Marco para los botones
        button_frame = ttk.Frame(top_frame)
        button_frame.pack(fill='x')

        self.btn_select = ttk.Button(button_frame, text="1. Seleccionar Imágenes", command=self.select_images)
        self.btn_select.pack(side='left', padx=10)

        self.btn_reorder = ttk.Button(button_frame, text="2. Aplicar Nuevo Orden", command=self.apply_new_order, state=tk.DISABLED)
        self.btn_reorder.pack(side='left', padx=10)

        self.btn_export = ttk.Button(button_frame, text="3. Exportar a PDF", command=self.export_pdf, state=tk.DISABLED)
        self.btn_export.pack(side='left', padx=10)
        
        # ⚠️ POSICIÓN DEL BOTÓN "Limpiar Todo" CORREGIDA (al lado de Exportar)
        self.btn_clear = ttk.Button(button_frame, text="Limpiar Todo", command=self.clear_all, state=tk.DISABLED)
        self.btn_clear.pack(side='left', padx=30) # Añadimos un poco más de padx para separarlo visualmente

        
        self.instruction_label = ttk.Label(self.master, text="Escribe el número de página deseado (ej: 1) y haz clic en 'Aplicar Nuevo Orden'. Las demás páginas se reajustarán automáticamente.", wraplength=1000)
        self.instruction_label.pack(pady=5, padx=10, fill='x')
        
        # --- Marco Central (Miniaturas Desplazables) ---
        
        self.canvas_scroll = tk.Canvas(self.master, borderwidth=0, bg='white')
        self.scrollbar = ttk.Scrollbar(self.master, orient="vertical", command=self.canvas_scroll.yview)
        
        self.thumbnail_frame = ttk.Frame(self.canvas_scroll, padding="5")

        self.canvas_scroll.configure(yscrollcommand=self.scrollbar.set)
        
        self.scrollbar.pack(side="right", fill="y")
        self.canvas_scroll.pack(side="left", fill="both", expand=True, padx=10, pady=10)
        
        self.canvas_scroll.create_window((0, 0), window=self.thumbnail_frame, anchor="nw", tags="self.thumbnail_frame", width=950) 
        
        self.thumbnail_frame.bind("<Configure>", lambda e: self.canvas_scroll.config(scrollregion=self.canvas_scroll.bbox("all")))
        
        self.canvas_scroll.bind_all("<MouseWheel>", self._on_mouse_wheel)
        self.canvas_scroll.bind_all("<Button-4>", lambda e: self._on_mouse_wheel(e, delta=1))
        self.canvas_scroll.bind_all("<Button-5>", lambda e: self._on_mouse_wheel(e, delta=-1))


        # --- Footer (Créditos) ---
        footer_frame = ttk.Frame(self.master, padding="5")
        footer_frame.pack(side='bottom', fill='x') 
        
        ttk.Label(footer_frame, text="Creado por Sebastián Ramírez", font=("Arial", 8)).pack(side='left', padx=10)

    # ----------------------------------------------------
    # MÉTODOS DE LA APLICACIÓN (SIN CAMBIOS FUNCIONALES)
    # ----------------------------------------------------

    def _on_mouse_wheel(self, event, delta=None):
        if delta is None:
            if self.master.tk.call('tk', 'windowingsystem') == 'aqua':
                delta = -event.delta
            else:
                delta = -int(event.delta / 120)
                
        self.canvas_scroll.yview_scroll(delta, "units")


    def clear_all(self):
        self.image_data = []
        self.img_refs = []
        self.order_vars = []
        
        for widget in self.thumbnail_frame.winfo_children():
            widget.destroy()

        self.btn_reorder.config(state=tk.DISABLED)
        self.btn_export.config(state=tk.DISABLED)
        self.btn_clear.config(state=tk.DISABLED)
        
        self.thumbnail_frame.update_idletasks()
        self.canvas_scroll.config(scrollregion=self.canvas_scroll.bbox("all"))
        messagebox.showinfo("Limpieza", "Lista de imágenes limpiada. Puedes seleccionar un nuevo lote.")


    def remove_image(self, index_to_remove):
        if messagebox.askyesno("Confirmar Eliminación", f"¿Estás seguro de que quieres eliminar la imagen de la Pág. {index_to_remove + 1}?"):
            
            del self.image_data[index_to_remove]
            
            for i, data in enumerate(self.image_data):
                data['order'] = i + 1
            
            self.display_thumbnails()
            
            if not self.image_data:
                self.clear_all()
            else:
                messagebox.showinfo("Eliminado", "Imagen eliminada. ¡Recuerda aplicar el nuevo orden si es necesario!")


    def select_images(self):
        f_types = [("Imágenes", "*.jpg *.jpeg *.png")]
        paths = filedialog.askopenfilenames(filetypes=f_types, title="Selecciona tus imágenes para el PDF")
        
        if paths:
            self.image_data = []
            
            sorted_paths = sorted(list(paths), key=sort_key_natural)
            
            for i, path in enumerate(sorted_paths):
                self.image_data.append({'path': path, 'order': i + 1})
                
            self.display_thumbnails()
            self.btn_reorder.config(state=tk.NORMAL)
            self.btn_export.config(state=tk.NORMAL)
            self.btn_clear.config(state=tk.NORMAL)


    def apply_new_order(self):
        new_data_input = []
        valid = True
        
        try:
            for i, data in enumerate(self.image_data):
                new_order_str = self.order_vars[i].get()
                new_order = int(new_order_str)
                
                if 1 <= new_order <= len(self.image_data):
                    new_data_input.append({'path': data['path'], 'new_order': new_order, 'original_index': i})
                else:
                    messagebox.showerror("Error de Orden", f"El número de página '{new_order_str}' no es válido.")
                    valid = False
                    break
        except ValueError:
            messagebox.showerror("Error de Orden", "Asegúrate de que todos los campos contienen un número entero.")
            valid = False

        if not valid:
            return

        final_list = [None] * len(self.image_data)
        items_to_move = sorted(new_data_input, key=lambda x: x['new_order'])
        occupied_positions = set()
        
        for item in items_to_move:
            while item['new_order'] in occupied_positions:
                item['new_order'] += 1
            
            if item['new_order'] <= len(self.image_data):
                final_list[item['new_order'] - 1] = item
                occupied_positions.add(item['new_order'])

        current_data_index = 0
        for i in range(len(final_list)):
            if final_list[i] is None:
                original_item_path = self.image_data[current_data_index]['path']
                
                while any(f and f['path'] == original_item_path for f in final_list) and current_data_index < len(self.image_data) -1:
                    current_data_index += 1
                    original_item_path = self.image_data[current_data_index]['path']

                if not any(f and f['path'] == original_item_path for f in final_list):
                    final_list[i] = {'path': original_item_path, 'new_order': i + 1, 'original_index': current_data_index}
                    occupied_positions.add(i+1)

                current_data_index += 1

        self.image_data = [{'path': item['path'], 'order': i + 1} for i, item in enumerate(final_list) if item]
        
        self.display_thumbnails()
        messagebox.showinfo("Reordenamiento", "Imágenes reordenadas exitosamente. El sistema reajustó las demás páginas.")


    def display_thumbnails(self):
        for widget in self.thumbnail_frame.winfo_children():
            widget.destroy()
        self.img_refs = []
        self.order_vars = []
        
        for index, data in enumerate(self.image_data):
            path = data['path']
            current_order = data['order']
            
            try:
                img_pil = Image.open(path)
                thumb_size = (80, 80)
                img_pil.thumbnail(thumb_size)
                img_tk = ImageTk.PhotoImage(img_pil)
                self.img_refs.append(img_tk) 
                
                item_frame = ttk.Frame(self.thumbnail_frame, relief="ridge", borderwidth=1)
                item_frame.grid(row=index, column=0, padx=5, pady=5, sticky='ew')
                
                ttk.Label(item_frame, text=f"Actual: {index + 1}", font=("Arial", 10)).pack(side='left', padx=5, pady=2)

                ttk.Label(item_frame, image=img_tk).pack(side='left', padx=5)
                
                ttk.Label(item_frame, text=os.path.basename(path), width=25, anchor='w').pack(side='left', padx=5)
                
                tk.Label(item_frame, text="", width=1).pack(side='left', expand=True, fill='x')
                
                ttk.Button(item_frame, text="Eliminar", command=lambda i=index: self.remove_image(i)).pack(side='right', padx=5)

                entry_frame = ttk.Frame(item_frame)
                entry_frame.pack(side='right', padx=5)
                
                ttk.Label(entry_frame, text="Pág. Deseada:").pack(side='left', padx=5)
                
                order_var = tk.StringVar(value=str(current_order))
                self.order_vars.append(order_var)
                
                entry_order = ttk.Entry(entry_frame, textvariable=order_var, width=5)
                entry_order.pack(side='left')
                
            except Exception as e:
                print(f"Error al cargar miniatura de {path}: {e}")
                
        self.thumbnail_frame.update_idletasks()
        self.canvas_scroll.config(scrollregion=self.canvas_scroll.bbox("all"))


    def export_pdf(self):
        if not self.image_data:
            messagebox.showwarning("Advertencia", "No hay imágenes seleccionadas para exportar.")
            return

        self.apply_new_order()
        
        if not self.image_data or len(self.image_data) != len(self.order_vars):
             return 

        output_file = filedialog.asksaveasfilename(
            defaultextension=".pdf",
            filetypes=[("Archivos PDF", "*.pdf")]
        )
        
        if not output_file:
            return 

        try:
            c = canvas.Canvas(output_file, pagesize=letter)
            
            for data in self.image_data: 
                filepath = data['path']
                
                img_pil = Image.open(filepath)
                img_width, img_height = img_pil.size
                
                margin = 72 
                max_page_width = PAGE_WIDTH - margin
                max_page_height = PAGE_HEIGHT - margin
                aspect_ratio = img_width / img_height
                
                if (max_page_width / max_page_height) > aspect_ratio:
                    new_height = max_page_height
                    new_width = new_height * aspect_ratio
                else:
                    new_width = max_page_width
                    new_height = new_width / aspect_ratio
                    
                x_center = (PAGE_WIDTH - new_width) / 2
                y_center = (PAGE_HEIGHT - new_height) / 2
                
                c.drawImage(filepath, x_center, y_center, new_width, new_height)
                c.showPage() 

            c.save()
            messagebox.showinfo("Éxito", f"El PDF fue creado exitosamente en: {output_file}")
            
        except Exception as e:
            messagebox.showerror("Error de Exportación", f"Ocurrió un error al crear el PDF: {e}")

if __name__ == "__main__":
    root = tk.Tk()
    root.geometry("1050x700") 
    root.minsize(700, 500) 
    app = ImageToPDFApp(root)
    root.mainloop()
