import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(public loaderService: LoaderService,
              private spinner: NgxSpinnerService) {
}

ngOnInit(): void {
this.spinner.show();
}

isLoading() {
  const isLoading = this.loaderService.isLoading;
    return isLoading;
  }
}
