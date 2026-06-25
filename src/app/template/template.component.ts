import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-template',
  standalone: true,
  imports: [MatToolbarModule,MatSidenavModule,MatListModule,MatMenuModule,MatIcon,RouterOutlet,RouterLink],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {

}
