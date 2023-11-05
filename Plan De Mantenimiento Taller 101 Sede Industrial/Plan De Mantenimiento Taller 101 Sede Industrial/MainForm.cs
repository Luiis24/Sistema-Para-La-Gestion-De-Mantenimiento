/*
 * Creado por SharpDevelop.
 * Usuario: nando
 * Fecha: 3/07/2023
 * Hora: 6:16 p. m.
 * 
 * Para cambiar esta plantilla use Herramientas | Opciones | Codificación | Editar Encabezados Estándar
 */
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace Plan_De_Mantenimiento_Taller_101_Sede_Industrial
{
	/// <summary>
	/// Description of MainForm.
	/// </summary>
	public partial class MainForm : Form
	{
		public MainForm()
		{
			//
			// The InitializeComponent() call is required for Windows Forms designer support.
			//
			InitializeComponent();
			
			//
			// TODO: Add constructor code after the InitializeComponent() call.
			//
		}
		
		void Label1Click(object sender, EventArgs e)
		{
			
		}
		
		void MainFormLoad(object sender, EventArgs e)
		{
			
		}
		
		void Label9Click(object sender, EventArgs e)
		{
			
		}
		
		void Label5Click(object sender, EventArgs e)
		{
			
		}
		
		
		void Button1Click(object sender, EventArgs e)
		{
			Tornos ad = new Tornos();
			this.Hide();
            ad.Show();
		}
	}
}
