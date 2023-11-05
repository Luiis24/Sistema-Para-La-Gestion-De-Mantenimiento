/*
 * Creado por SharpDevelop.
 * Usuario: nando
 * Fecha: 7/08/2023
 * Hora: 5:35 p. m.
 * 
 * Para cambiar esta plantilla use Herramientas | Opciones | Codificación | Editar Encabezados Estándar
 */
using System;
using System.Drawing;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace Plan_De_Mantenimiento_Taller_101_Sede_Industrial
{
	/// <summary>
	/// Description of Opcion_Manual.
	/// </summary>
	public partial class Opcion_Manual : Form
	{
		public Opcion_Manual()
		{
			//
			// The InitializeComponent() call is required for Windows Forms designer support.
			//
			InitializeComponent();
			
			//
			// TODO: Add constructor code after the InitializeComponent() call.
			//
		}
		
		void Button1Click(object sender, EventArgs e)
		{
            string url = "https://drive.google.com/file/d/1h-8JtYG6ktwJmSXwbaQmOejobHv4edvd/view";

            
            Process.Start(url);
        }

        

        void Button5Click(object sender, EventArgs e)
		{
			
		}
		
		void Opcion_ManualLoad(object sender, EventArgs e)
		{
			
		}
		
		void PictureBox1Click(object sender, EventArgs e)
		{
			
		}
		
		void Button3Click(object sender, EventArgs e)
		{
			  // Nombre del recurso PDF
            string nombreRecursoPDF = "TORNO WISTON - CDL.pdf";

            // Obtiene la ubicación del ensamblado actual
            string ubicacionEnsamblado = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            // Ruta completa al archivo PDF en el directorio temporal
            string rutaTemporalPDF = Path.Combine(ubicacionEnsamblado, nombreRecursoPDF);

            // Extrae el recurso PDF en la ubicación temporal
            using (Stream recursoStream = Assembly.GetExecutingAssembly().GetManifestResourceStream(nombreRecursoPDF))
            {
                using (FileStream archivoStream = new FileStream(rutaTemporalPDF, FileMode.Create))
                {
                    recursoStream.CopyTo(archivoStream);
                }
            }

            // Abre el archivo PDF con la aplicación asociada
            Process.Start(rutaTemporalPDF);
        }
	}
}
