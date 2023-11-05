/*
 * Creado por SharpDevelop.
 * Usuario: nando
 * Fecha: 27/10/2023
 * Hora: 4:08 a. m.
 * 
 * Para cambiar esta plantilla use Herramientas | Opciones | Codificación | Editar Encabezados Estándar
 */
namespace Plan_De_Mantenimiento_Taller_101_Sede_Industrial
{
	partial class Registro
	{
		/// <summary>
		/// Designer variable used to keep track of non-visual components.
		/// </summary>
		private System.ComponentModel.IContainer components = null;
		
		/// <summary>
		/// Disposes resources used by the form.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing) {
				if (components != null) {
					components.Dispose();
				}
			}
			base.Dispose(disposing);
		}
		
		/// <summary>
		/// This method is required for Windows Forms designer support.
		/// Do not change the method contents inside the source code editor. The Forms designer might
		/// not be able to load this method if it was changed manually.
		/// </summary>
		private void InitializeComponent()
		{
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Registro));
			this.pictureBox1 = new System.Windows.Forms.PictureBox();
			this.Iniciar_Sesion = new System.Windows.Forms.Button();
			this.btn_registro = new System.Windows.Forms.Button();
			this.label1 = new System.Windows.Forms.Label();
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
			this.SuspendLayout();
			// 
			// pictureBox1
			// 
			this.pictureBox1.ErrorImage = ((System.Drawing.Image)(resources.GetObject("pictureBox1.ErrorImage")));
			this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
			this.pictureBox1.InitialImage = ((System.Drawing.Image)(resources.GetObject("pictureBox1.InitialImage")));
			this.pictureBox1.Location = new System.Drawing.Point(121, 12);
			this.pictureBox1.Name = "pictureBox1";
			this.pictureBox1.Size = new System.Drawing.Size(100, 75);
			this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.CenterImage;
			this.pictureBox1.TabIndex = 0;
			this.pictureBox1.TabStop = false;
			// 
			// Iniciar_Sesion
			// 
			this.Iniciar_Sesion.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(52)))), ((int)(((byte)(168)))), ((int)(((byte)(83)))));
			this.Iniciar_Sesion.Cursor = System.Windows.Forms.Cursors.Hand;
			this.Iniciar_Sesion.FlatAppearance.BorderSize = 0;
			this.Iniciar_Sesion.FlatAppearance.CheckedBackColor = System.Drawing.Color.Red;
			this.Iniciar_Sesion.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
			this.Iniciar_Sesion.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.Iniciar_Sesion.Font = new System.Drawing.Font("Comic Sans MS", 15F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.Iniciar_Sesion.ForeColor = System.Drawing.Color.White;
			this.Iniciar_Sesion.Location = new System.Drawing.Point(88, 216);
			this.Iniciar_Sesion.Name = "Iniciar_Sesion";
			this.Iniciar_Sesion.Size = new System.Drawing.Size(166, 40);
			this.Iniciar_Sesion.TabIndex = 31;
			this.Iniciar_Sesion.Text = "Iniciar Sesion";
			this.Iniciar_Sesion.UseVisualStyleBackColor = false;
			// 
			// btn_registro
			// 
			this.btn_registro.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(52)))), ((int)(((byte)(168)))), ((int)(((byte)(83)))));
			this.btn_registro.Cursor = System.Windows.Forms.Cursors.Hand;
			this.btn_registro.FlatAppearance.BorderSize = 0;
			this.btn_registro.FlatAppearance.CheckedBackColor = System.Drawing.Color.Red;
			this.btn_registro.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
			this.btn_registro.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
			this.btn_registro.Font = new System.Drawing.Font("Comic Sans MS", 15F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.btn_registro.ForeColor = System.Drawing.Color.White;
			this.btn_registro.Location = new System.Drawing.Point(48, 277);
			this.btn_registro.Name = "btn_registro";
			this.btn_registro.Size = new System.Drawing.Size(246, 40);
			this.btn_registro.TabIndex = 32;
			this.btn_registro.Text = "Registrar Aprendiz";
			this.btn_registro.UseVisualStyleBackColor = false;
			this.btn_registro.Click += new System.EventHandler(this.Btn_registroClick);
			// 
			// label1
			// 
			this.label1.Anchor = System.Windows.Forms.AnchorStyles.None;
			this.label1.Font = new System.Drawing.Font("Gill Sans MT", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.Location = new System.Drawing.Point(22, 106);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(298, 77);
			this.label1.TabIndex = 33;
			this.label1.Text = "Bienvenido Al Sistema De Gestion De Mantenimiento";
			this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
			// 
			// Registro
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackColor = System.Drawing.Color.White;
			this.ClientSize = new System.Drawing.Size(342, 377);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.btn_registro);
			this.Controls.Add(this.Iniciar_Sesion);
			this.Controls.Add(this.pictureBox1);
			this.MaximizeBox = false;
			this.Name = "Registro";
			this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
			this.Text = "Registro";
			((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
			this.ResumeLayout(false);
		}
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Button btn_registro;
		private System.Windows.Forms.Button Iniciar_Sesion;
		private System.Windows.Forms.PictureBox pictureBox1;
	}
}
