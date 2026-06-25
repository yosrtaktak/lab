import { Evenement } from './../../model/evenement';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvtService } from '../../service/evt.service';

@Component({
  selector: 'app-visibility',
  standalone: true,
  imports: [],
  templateUrl: './visibility.component.html',
  styleUrl: './visibility.component.css'
})
export class VisibilityComponent {
  EventGlobal!: Evenement;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private evtService: EvtService) { 
    console.log("ID reçu dans VisibilityComponent:", data); 
    this.evtService.GetEventById(data).subscribe(event => {
      this.EventGlobal = event;
    });
  
  }
  }
