import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-project-map',
  standalone: true,
  imports: [],
  templateUrl: './project-map.component.html',
  styleUrl: './project-map.component.css'
})
export class ProjectMapComponent implements AfterViewInit {
  private markOwnPath = '/markmap/InvoiceSystem.md'

  constructor(
    private http: HttpClient,
    private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.loadMarkdown();
  }

  loadMarkdown() {
    this.http.get(this.markOwnPath, {responseType: 'text'}).subscribe((markdown) => {
      this.renderMarkMap(markdown);
    })
  }

  async renderMarkMap(markdown: string): Promise<void> {
    // Importa dinámicamente las bibliotecas necesarias
    const { Transformer } = await import('markmap-lib');
    const { Markmap } = await import('markmap-view');

    // Transforma el contenido Markdown
    const transformer = new Transformer();
    const { root } = transformer.transform(markdown);

    // Renderiza el mapa mental en el contenedor SVG
    const svg = this.el.nativeElement.querySelector('svg');
    Markmap.create(svg, {}, root);
  }

}
