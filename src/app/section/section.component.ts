import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const options = {
    strings: [ ' <strong>Brindamos:</strong>', 'Excelencia académica','Formación Integral', 'Visión Humanista'],
    typeSpeed: 100,
    backSpeed: 100,
    smartBackspace: true, // this is a default
    loop: true
    };
    const typed = new Typed('.typed', options);
  }

}
