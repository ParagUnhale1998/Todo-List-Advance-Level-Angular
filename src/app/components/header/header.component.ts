import { Component, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  primaryColor: string ='#39b4bc'

	constructor(private modalService: NgbModal,private renderer: Renderer2) {
    this.changeTheme()
  }
  open() {
		const modalRef = this.modalService.open(TodoFormComponent);
	}
  changeTheme() {
    document.documentElement.style.setProperty('--primary-color', this.primaryColor);
    
    const hoverColor = this.calculateHoverColor(this.primaryColor);
    document.documentElement.style.setProperty('--primary-color-hover', hoverColor);

  }

  calculateHoverColor(color: string): string {
    // Convert the color to HSL
    const hslRegex = /hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/;
    const match = color.match(hslRegex);
    if (match) {
      const hue = parseInt(match[1]);
      const saturation = parseInt(match[2]);
      const lightness = parseInt(match[3]);

      // Adjust lightness for hover effect
      const hoverLightness = Math.min(lightness + 10, 100); // Increase lightness by 10% for hover
      return `hsl(${hue}, ${saturation}%, ${hoverLightness}%)`;
    } else {
      // Fallback to default behavior if not HSL color
      return color;
    }
  }

}
