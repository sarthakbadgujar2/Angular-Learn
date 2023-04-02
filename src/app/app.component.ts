import { InitService } from './init.service';
import { LocalStorageToken } from './localstorage.token';
import { LoggerService } from './logger.service';
import { RoomsComponent } from './rooms/rooms.component';
import { Component, ViewChild, ViewContainerRef, OnInit, AfterViewInit, ElementRef, Optional, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'hotelinventoryapp';

  @ViewChild('name', { static: true }) name!: ElementRef;
  @ViewChild('user', { read: ViewContainerRef }) vcr !: ViewContainerRef;

  constructor(@Optional() private loggerservice: LoggerService,
    @Inject(LocalStorageToken) private localstorage: any,
    private InitService: InitService
  ) {
    console.log(InitService.config)
  }
  ngOnInit() {
    this.loggerservice?.log("AppComponent.ngOnit()");
    this.name.nativeElement.innerText = "Hilton Hotel From Template";

    this.localstorage.setItem('name', 'Hilton Hotel')
  }
  ngAfterViewInit(): void {
    const componentRef = this.vcr.createComponent(RoomsComponent)
    componentRef.instance.noOfRooms = 50;
  }

}
