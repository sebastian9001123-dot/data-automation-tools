import pandas as pd
import glob
import tkinter as tk
from tkinter import filedialog, messagebox

def generar_consolidado():
    carpeta = filedialog.askdirectory(title="Selecciona la carpeta con los Excels")
    if not carpeta:
        return
    
    archivos = glob.glob(carpeta + "/*.xlsx")
    if not archivos:
        messagebox.showerror("Error", "No se encontraron archivos .xlsx en la carpeta")
        return
    
    df_list = []
    for archivo in archivos:
        try:
            df = pd.read_excel(archivo, header=4)
            df = df[['Familia', 'Tot(Ton)', 'Tot Rechazo(Ton)']]
            df = df[df['Familia'].isin(['Plásticos', 'Papel y cartón', 'Metales', 'Vidrios'])]
            df_list.append(df)
        except Exception as e:
            messagebox.showwarning("Aviso", f"No se pudo leer {archivo}: {e}")
    
    if not df_list:
        messagebox.showerror("Error", "No se pudo leer ningún archivo válido.")
        return
    
    df_total = pd.concat(df_list)
    df_resumen = df_total.groupby('Familia', as_index=False).sum()
    
    salida = carpeta + "/Consolidado_Anual.xlsx"
    df_resumen.to_excel(salida, index=False)
    
    messagebox.showinfo("Éxito", f"Consolidado generado en:\n{salida}")

# ---- Interfaz ----
ventana = tk.Tk()
ventana.title("Consolidador de Residuos")
ventana.geometry("400x200")

lbl = tk.Label(ventana, text="Generar consolidado anual de residuos", font=("Arial", 12))
lbl.pack(pady=20)

btn = tk.Button(ventana, text="Seleccionar carpeta y generar", command=generar_consolidado, width=30, height=2, bg="lightblue")
btn.pack(pady=10)

ventana.mainloop()
