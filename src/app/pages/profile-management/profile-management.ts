import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-management',
  imports: [FormsModule],
  templateUrl: './profile-management.html',
  styleUrl: './profile-management.css',
})
export class ProfileManagement {
  // Datos de ejemplo para prellenar el formulario
  username = 'Israel';
  email = 'israel@example.com';
  password = '';
  confirmPassword = '';
  showPassword = false;
  profileImage: string | ArrayBuffer | null = 'profile.jpg';

  constructor(private router: Router) {}

  // Logica para previsualizar la imagen seleccionada
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Alternar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Guardar los cambios realizados en el perfil
  saveChanges() {
    // Validar que las contraseñas coincidan antes de guardar
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    console.log('Cambios guardados:', { username: this.username, email: this.email });
    alert('¡Cambios guardados correctamente!');
    this.router.navigate(['/profile']);
  }

  // Eliminar la cuenta del usuario
  deleteAccount() {
    const confirmacion = confirm('¿Estas seguro de que quieres eliminar tu cuenta? Esta accion no se puede deshacer.');
    if (confirmacion) {
      console.log('Cuenta eliminada');
      this.router.navigate(['/']);
    }
  }
}
