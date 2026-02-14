// theme.service.ts

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  applyGroupStyles(group: number): void {
    const head = document.getElementsByTagName('head')[0];
    let themeHref: string;

    switch (group) {
      case 1:
        themeHref = 'assets/group1.css'; 
        break;
      case 2:
        themeHref = 'assets/group2.css'; 
        break;
      case 3:
        themeHref = 'assets/group3.css'; 
        break;
      case 4:
        themeHref = 'assets/group4.css';
        break;
      default:
        themeHref = 'assets/group1.css'; 
        break;
    }

    if (themeHref) {
      const existingLink = document.getElementById('theme-link') as HTMLLinkElement;
      if (existingLink) {
        this.renderer.setAttribute(existingLink, 'href', themeHref);
      } else {
        const link = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'id', 'theme-link');
        this.renderer.setAttribute(link, 'rel', 'stylesheet');
        this.renderer.setAttribute(link, 'href', themeHref);
        this.renderer.appendChild(head, link);
      }
    }
  }
}
