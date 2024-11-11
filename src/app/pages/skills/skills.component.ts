import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit {
  isZooming = false //variable para controlar la animacion del zoom

  ngOnInit(): void {
    this.startZoom(); //llamamos al metodo
  }

//metodo para iniciar el zoom
  startZoom() {
    this.isZooming = true;

    setTimeout(() => {
      this.isZooming = false
    }, 3000)

  }
}
