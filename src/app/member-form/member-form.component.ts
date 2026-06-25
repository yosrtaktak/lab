import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../../service/member.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.css'
})
export class MemberFormComponent implements OnInit{
  constructor(private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { }
  form!:FormGroup;
    idcourant!:any;
  ngOnInit() {
    this.idcourant = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.idcourant) {
      this.memberService.getMemberById(this.idcourant).subscribe((member) => {
        const createdDateValue = member.createdDate 
          ? new Date(member.createdDate) 
          : null;
        this.form = new FormGroup({
          cin: new FormControl(member.cin, Validators.required),
          nom: new FormControl(member.nom, Validators.required),
          type: new FormControl(member.type, Validators.required),
          createdDate: new FormControl(createdDateValue, Validators.required)
        });
      });
    } else {
      this.form = new FormGroup({
        cin: new FormControl(null, Validators.required),
        nom: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required),
        createdDate: new FormControl(null, Validators.required)
      });
    }
  }
  onSubmit() {
    const formValue = this.form.value;

    let createdDate: string | null = null;
    if (formValue.createdDate instanceof Date) {
      const date = new Date(formValue.createdDate);
      date.setDate(date.getDate() + 1);
      createdDate = date.toISOString().split('T')[0];
    }

    const payload = {
      ...formValue,
      createdDate: createdDate
    };

    if (this.idcourant) {
      this.memberService.updateMember(this.idcourant, payload).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.memberService.addMember(payload).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}