import { Component, OnInit } from '@angular/core';
import{ ChangeDetectorRef } from '@angular/core';

import {NgLoadingService} from './ng-loading.service';

@Component({
  selector: 'app-ng-loading',
  templateUrl: './ng-loading.component.html',
  styleUrls: ['./ng-loading.component.css']
})
export class NgLoadingComponent implements OnInit {

  exibirLoading : boolean = true;

  constructor(private cdRef : ChangeDetectorRef ) { }

  ngOnInit() {
    this.loading();
  }

  loading(){
    NgLoadingService.loading.subscribe(data => {
        this.exibirLoading =  data;

        /*Utilizado para não acontecer 'ExpressionChangedAfterItHasBeenCheckedError' */
        this.cdRef.detectChanges();
    });
  }

}
