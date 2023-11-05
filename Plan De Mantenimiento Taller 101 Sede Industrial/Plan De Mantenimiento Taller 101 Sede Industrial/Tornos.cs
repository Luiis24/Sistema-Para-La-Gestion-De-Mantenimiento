/*
 * Creado por SharpDevelop.
 * Usuario: nando
 * Fecha: 7/07/2023
 * Hora: 1:27 p. m.
 * 
 * Para cambiar esta plantilla use Herramientas | Opciones | Codificación | Editar Encabezados Estándar
 */
using System;
using System.Drawing;
using System.Windows.Forms;

namespace Plan_De_Mantenimiento_Taller_101_Sede_Industrial
{
	/// <summary>
	/// Description of Tornos.
	/// </summary>
	public partial class Tornos : Form
	{
		public Tornos()
		{
			//
			// The InitializeComponent() call is required for Windows Forms designer support.
			//
			InitializeComponent();
			
			//
			// TODO: Add constructor code after the InitializeComponent() call.
			//
		}
		
		void TornosLoad(object sender, EventArgs e)
		{
			
		}
		
		void Button1Click(object sender, EventArgs e)
		{
			Wiston1 ad = new Wiston1();
			this.Hide();
            ad.Show();			
		}

        private void button3_Click(object sender, EventArgs e)
        {
            Wiston2 ad = new Wiston2();
            this.Hide();
            ad.Show();
        }
		
		void Atras_TornosClick(object sender, EventArgs e)
		{
			MainForm ad = new MainForm();
            this.Hide();
            ad.Show();
		}
    }
}
