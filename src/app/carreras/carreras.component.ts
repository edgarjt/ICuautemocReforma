import { Component, OnInit, ViewChild} from '@angular/core';
import {CarrerasService} from '../services/carreras.service';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort} from '@angular/material';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  constructor(private carreraService: CarrerasService) { }

  displayedColumns: string[] = ['car_nombre'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.carreraService.getCarreras().subscribe(response => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }

}
