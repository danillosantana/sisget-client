import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-visualiza-comprovante',
  templateUrl: './visualiza-comprovante.component.html',
  styleUrls: ['./visualiza-comprovante.component.css'],
  providers: [DialogService]
})
export class VisualizaComprovanteComponent implements OnInit {

  @Input() img : any;


  constructor(public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public dialogService : DialogService) { }

  ngOnInit(): void {
    if (this.config?.data?.img) {
        this.img = this.config.data.img;
    }
  }
}
