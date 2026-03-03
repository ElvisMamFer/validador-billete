import { bootstrapApplication } from '@angular/platform-browser';
import { ValidadorComponent } from './app/validador/validador.component';

bootstrapApplication(ValidadorComponent)
  .catch(err => console.error(err));