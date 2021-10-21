import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog/dialog.component';
import { IMentor } from 'src/app/shared/mentor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'userType', 'companyName', 'status', 'action'];
  ELEMENT_DATA!: IMentor[];
  dataSource = new MatTableDataSource<IMentor>(this.ELEMENT_DATA);

  options = ["All", "HR", "Mentor"];

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private apiSrv: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
   this.getData();
  }


  getData(){
    this.apiSrv.getDataMentor().subscribe(data=>{
      this.dataSource.data = data as IMentor[];
    })
  }

  doFilter(event:any) {
    const value = event.target.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  addDialog(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {type: "add"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.dataSource.data = result;
      }else{
        return;
      }
    });
  }

  showEditDialog(id: string){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {id: id, type: "edit", dataEdit: this.dataSource.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.dataSource.data = result;
      }else{
        return;
      }
    });
  }

  showDialog(id: string){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {id, type: "delete"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.dataSource.data = result;
      }else{
        return;
      }
    });
  }

}
