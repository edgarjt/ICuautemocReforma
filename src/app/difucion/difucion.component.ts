import { Component, OnInit } from '@angular/core';
import { DifucionService } from '../services/difucion.service';

@Component({
  selector: 'app-difucion',
  templateUrl: './difucion.component.html',
  styleUrls: ['./difucion.component.css']
})
export class DifucionComponent implements OnInit {
  data: any;

  constructor( private _difucionService: DifucionService) {

  }

  ngOnInit() {
    this._difucionService.getDifucion().subscribe(response => {
      this.data = response;
      console.log(response);
    });
  }

}

