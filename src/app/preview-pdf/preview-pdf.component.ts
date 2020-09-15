import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MateriasService} from '../services/materias.service';

@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css']
})
export class PreviewPdfComponent implements OnInit {
  srcPdf: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataPdf,
    private materiaService: MateriasService,
  ) { }

  ngOnInit() {
    this.srcPdf = this.materiaService.viewPdf() + this.dataPdf.mat_pdf;
  }

}
