import { EvtService } from './../../service/evt.service';
import { Component, inject, Inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-modal-evt',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './modal-evt.component.html',
  styleUrl: './modal-evt.component.css'
})
export class ModalEvtComponent {
  form: FormGroup;
  isEditing = false;
  readonly dialogRef = inject(MatDialogRef<ModalEvtComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private evtService: EvtService) {
    // Initialize form with all fields
    this.form = new FormGroup({
      titre: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      lieu: new FormControl('')
    });

    // If editing, fetch and populate data
    if (data) {
      this.isEditing = true;
      this.evtService.GetEventById(data).subscribe((event) => {
        this.form.patchValue({
          titre: event.titre,
          dateDebut: event.dateDebut,
          dateFin: event.dateFin,
          lieu: event.lieu
        });
      });
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
