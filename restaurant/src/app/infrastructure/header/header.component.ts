import { Component } from '@angular/core';
import { MenuItems } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  btns: MenuItems[];
  constructor() {
    this.btns = [
      { path: '/order', label: 'Order now' },
      { path: '/recipes', label: 'Our Plates' },
      { path: '/history', label: 'History' },
      { path: '/storage', label: 'Store' },
    ];
  }
}
