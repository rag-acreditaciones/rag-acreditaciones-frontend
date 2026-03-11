import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

const PASSWORD_PATTERN = String.raw`(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}`;

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmar = control.get('confirmarPassword')?.value;
  return password === confirmar ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  form: FormGroup;
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
        confirmarPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatch }
    );
  }

  get nombre() { return this.form.get('nombre')!; } // NOSONAR
  get email() { return this.form.get('email')!; } // NOSONAR
  get password() { return this.form.get('password')!; } // NOSONAR
  get confirmarPassword() { return this.form.get('confirmarPassword')!; } // NOSONAR

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const { nombre, email, password } = this.form.value;

    this.authService.register({ nombre, email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.successMessage.set('Usuario creado correctamente. Redirigiendo al login...');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 400) {
          const msg = err.error?.mensaje ?? '';
          if (msg.includes('email')) {
            this.errorMessage.set('El email ya está registrado.');
          } else {
            this.errorMessage.set('Datos incorrectos. Revisa los campos.');
          }
        } else {
          this.errorMessage.set('Error al conectar con el servidor. Inténtalo de nuevo.');
        }
      },
    });
  }
}
