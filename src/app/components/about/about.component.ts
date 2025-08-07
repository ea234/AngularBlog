import { Component } from '@angular/core';
import { CanComponentDeactivate } from '../../guards/confirmation/confirmation.guard';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements CanComponentDeactivate {

  confirm(): boolean {
      return confirm( "Seite verlassen?" );
  }
}
