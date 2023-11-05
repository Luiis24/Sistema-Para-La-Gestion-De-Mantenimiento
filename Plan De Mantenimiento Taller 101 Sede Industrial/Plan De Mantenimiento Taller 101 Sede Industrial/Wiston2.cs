/*
 * Creado por SharpDevelop.
 * Usuario: nando
 * Fecha: 7/07/2023
 * Hora: 3:32 p. m.
 * 
 * Para cambiar esta plantilla use Herramientas | Opciones | Codificación | Editar Encabezados Estándar
 */
using System;
using System.Drawing;
using System.Diagnostics;
using System.Windows.Forms;

namespace Plan_De_Mantenimiento_Taller_101_Sede_Industrial
{
	/// <summary>
	/// Description of Wiston1.
	/// </summary>
	public partial class Wiston2 : Form
	{
		public Wiston2()
		{
			//
			// The InitializeComponent() call is required for Windows Forms designer support.
			//
			InitializeComponent();
			
			//
			// TODO: Add constructor code after the InitializeComponent() call.
			//
		}
		
		void Wiston1Load(object sender, EventArgs e)
		{
			
		}
		
		void Button8Click(object sender, EventArgs e)
		{
			
		}
		
		void Button7Click(object sender, EventArgs e)
		{
			w1_hv ad = new w1_hv();
			this.Hide();
            ad.Show();
		}
		
		void Button5Click(object sender, EventArgs e)
		{
			Opcion_Manual ad = new Opcion_Manual();
			ad.ShowDialog();
        }

        private void button3_Click(object sender, EventArgs e)
        {
			this.Close();
        }
    }
}





