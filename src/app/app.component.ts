import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseUIModule } from 'firebaseui-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirebaseUIModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fcb-app';
}
