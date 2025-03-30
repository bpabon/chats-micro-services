import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-responsive-helper',
  imports: [NgIf],
  templateUrl: './responsive-helper.component.html',
  styleUrl: './responsive-helper.component.css'
})
export class ResponsiveHelperComponent implements OnInit{
  public env: any = {production: false};

  constructor() {}

  ngOnInit(): void {}
}
