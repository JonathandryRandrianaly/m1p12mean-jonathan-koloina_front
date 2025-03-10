import {Component, OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  ngOnInit() {
    initFlowbite();
  }
}
