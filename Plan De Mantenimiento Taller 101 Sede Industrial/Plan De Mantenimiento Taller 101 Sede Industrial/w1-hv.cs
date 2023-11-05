/*
 * Creado por SharpDevelop.
 * Usuario: nando
 * Fecha: 7/07/2023
 * Hora: 6:08 p. m.
 * 
 * Para cambiar esta plantilla use Herramientas | Opciones | Codificación | Editar Encabezados Estándar
 */
using System;
using System.Drawing;
using System.Windows.Forms;

namespace Plan_De_Mantenimiento_Taller_101_Sede_Industrial
{
	/// <summary>
	/// Description of w1_hv.
	/// </summary>
	public partial class w1_hv : Form
	{
		public w1_hv()
		{
			//
			// The InitializeComponent() call is required for Windows Forms designer support.
			//
			InitializeComponent();
			
			//
			// TODO: Add constructor code after the InitializeComponent() call.
			//
		}
		
		void Button8Click(object sender, EventArgs e)
		{
			w1_check1 ad = new w1_check1();
			this.Hide();
            ad.Show();			
		}
		
		void Button7Click(object sender, EventArgs e)
		{
			this.Close();
		}
		
		void Button5Click(object sender, EventArgs e)
		{
			
		}
		
		void Atras_TornosClick(object sender, EventArgs e)
		{
			Wiston1 ad = new Wiston1();
            this.Hide();
            ad.Show();			
		}
	}
}
