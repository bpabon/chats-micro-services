import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '../../services/menu.service';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
// import { WebsocketService } from '../../../../shared/services/realtime/websocket.service';
// import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  imports: [AngularSvgIconModule, NavbarMenuComponent, ProfileMenuComponent, NavbarMobileComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy  {
  //chatSub!: Subscription;
  constructor(
    private menuService: MenuService,
    // private socketService: WebsocketService
  ) {
    //this.socketService.connectSockets();
  }
  ngOnInit(): void {
    // console.log('Ingreso navbar')
    // this.chatSub = this.socketService.chatEvents$.subscribe({
    //   next: (msg) => {
    //     console.log(msg)
    //   },
    //   error: (err) => console.error('Error en chat socket:', err),
    //   complete: () => console.warn('Conexión de chat cerrada')
    // });
  }
  ngOnDestroy() {
    // this.socketService.disconnectSockets();
    // if (this.chatSub) {
    //   this.chatSub.unsubscribe();
    // }
  }
  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
