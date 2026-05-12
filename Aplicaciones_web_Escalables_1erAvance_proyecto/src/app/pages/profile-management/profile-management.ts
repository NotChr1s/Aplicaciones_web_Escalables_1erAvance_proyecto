import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-management.html',
  styleUrl: './profile-management.css',
})
export class ProfileManagement implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public authService = inject(AuthService);
  private userService = inject(UserService);

  //Definición del Formulario
  profileForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [''],
    confirmPassword: [''],
    profileImage: [''] 
  });

  // Variables para la interfaz
  showPassword = false;
  profileImagePreview: string | ArrayBuffer | null = 'assets/profile.jpg';

  ngOnInit(): void {
    // Cargar datos del usuario actual
    const user = this.authService.currentUser();
    if (user) {
      this.profileForm.patchValue({
        username: user.name,
        profileImage: user.profilePicture
      });
      this.profileImagePreview = user.profilePicture || 'assets/profile.jpg';
    }else{
      this.router.navigate(['/login']);
    }
  }

  //previsualización y guardado de imagen en el Form
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
        // Sincronizamos el valor con el formulario reactivo
        this.profileForm.patchValue({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  saveChanges() {
    if (this.profileForm.invalid) return;

    const { username, password, confirmPassword, profileImage } = this.profileForm.value;

    if (password && password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const updatedData = {
      name: username!,
      profilePicture: profileImage!,
      ...(password ? { password } : {})
    };

    const userId = this.authService.currentUser()?.id;

    if (!userId) {
      alert('No se pudo encontrar el ID del usuario.');
      return;
    }

    // Llamada al servicio
    this.userService.updateUser(userId, updatedData).subscribe({
      next: () => {
        alert('Perfil actualizado con éxito');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('Hubo un error al guardar los cambios.');
      }
    });
  }

  deleteAccount() {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmacion) {
      const userId = this.authService.currentUser()?.id;
      if (!userId) {
        alert('No se pudo encontrar el ID del usuario.');
        return;
      }
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('Cuenta eliminada con éxito');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al eliminar cuenta:', err);
          alert('Hubo un error al eliminar la cuenta.');
        }
      });
    }
  }
}