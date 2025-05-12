import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-responsive-helper',
  imports: [NgIf],
  templateUrl: './responsive-helper.component.html',
  styleUrl: './responsive-helper.component.css'
})
export class ResponsiveHelperComponent implements OnInit{
  public env: any = environment;

  constructor() {}

  ngOnInit(): void {}
}
