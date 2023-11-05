/*
 * Creado por SharpDevelop.
 * Usuario: nando
 * Fecha: 7/07/2023
 * Hora: 4:26 p. m.
 * 
 * Para cambiar esta plantilla use Herramientas | Opciones | Codificación | Editar Encabezados Estándar
 */
using System;
using System.Drawing;
using System.Windows.Forms;

namespace Plan_De_Mantenimiento_Taller_101_Sede_Industrial
{
	/// <summary>
	/// Description of w1_check1.
	/// </summary>
	public partial class w1_check1 : Form
	{
		public w1_check1()
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
			this.Close();
		}
		
		void Button7Click(object sender, EventArgs e)
		{
			w1_hv ad = new w1_hv();
			this.Hide();
            ad.Show();			
		}
	}
}
