import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationError = '';

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onRegister(form: any) {
    const users = JSON.parse(localStorage.getItem('hp') || '[]');
    const exists = users.some((u: any) => u.email === form.value.email);
    if (exists) {
      this.registrationError = 'Email already registered. Please login.';
      return;
    }
    users.push(form.value);
    localStorage.setItem('hp', JSON.stringify(users));
    this.router.navigate(['/login']);
  }
}
