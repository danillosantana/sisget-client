import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() arquivo : File;
  @Input() titulo : string;
  @Input() accept : string;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.arquivo = files.item(0);
    console.log('arquivo', this.arquivo);
  }
}
