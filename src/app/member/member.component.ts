import { Member } from './../../model/member';
import { MemberService } from './../../service/member.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cin', 'nom', 'type', 'createdDate','actions'];
  constructor(private MemberService: MemberService, private snackBar: MatSnackBar, private dialog: MatDialog) { }
  // tableau de membres
  dataSource :Member []= [];
  ngOnInit() {
   this.fetchMembers();


}

fetchMembers() {
   this.MemberService.getAllMembers().subscribe((data)=>{
    this.dataSource=data;
    console.log(this.dataSource);
  });
}

editMember(member: Member) {
  this.router.navigate(['/edit', member.id]);
}

private router = inject(Router);

deleteMember(Memberid: any) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '380px',
    maxWidth: '92vw',
    panelClass: 'confirm-dialog-panel'
  });
  dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.MemberService.deleteMember(Memberid).subscribe(() => {
        this.fetchMembers();
        this.snackBar.open('Member deleted successfully', '', {
          duration: 3000
        });
      });
    }
  });
}
}