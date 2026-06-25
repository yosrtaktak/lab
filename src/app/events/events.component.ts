import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Evenement } from '../../model/evenement';
import { EvtService } from '../../service/evt.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalEvtComponent } from '../modal-evt/modal-evt.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { VisibilityComponent } from '../visibility/visibility.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
dataSource: MatTableDataSource<Evenement> = new MatTableDataSource();
displayedColumns = ['id', 'titre', 'dateDebut', 'dateFin', 'lieu','actions'];
constructor(private evtService: EvtService,private dialog: MatDialog) { }

ngOnInit() {
this.fetchEvents();
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

fetchEvents() {
  this.evtService.GetAllEvents().subscribe((events: Evenement[]) => {
    this.dataSource.data = events;
  });
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  open(){
    let dialogRef = this.dialog.open(ModalEvtComponent,{
     
    });
    dialogRef.afterClosed().subscribe((response)=>{
      this.evtService.addEvent(response).subscribe(()=>{
        this.fetchEvents();
      })
    })
}

  openEdit(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    let dialogRef = this.dialog.open(ModalEvtComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.evtService.updateEvent(id, response).subscribe(() => {
          this.fetchEvents();
        });
      }
    });
  }

  deleteEvt(id: string){
    let dialogRef = this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.evtService.deleteEvtById(id).subscribe(()=>{
          this.fetchEvents();
        });
      }
    });
}

openAssign(id: string){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
   let dialogRef = this.dialog.open(VisibilityComponent,dialogConfig,)
}
}