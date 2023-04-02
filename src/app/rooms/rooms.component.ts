import { RoomsService } from './services/rooms.service';
import { HeaderComponent } from './../header/header.component';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy {

  hotelName: string = 'Hilton Hotel';
  noOfRooms: number = 10;
  hideRooms: boolean = true;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  roomList: RoomList[] = [];

  title = 'Room List';

  selectedRoom !: RoomList

  stream = new Observable(observe => {
    observe.next("user1");
    observe.next("user2");
    observe.next("user3");
    observe.complete();
    // observe.error("error");
  })

  @ViewChild(HeaderComponent, { static: true }) headerComponent!: HeaderComponent;

  // roomservice = new RoomsService();

  totalBytes = 0;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  subscription!: Subscription;

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message)
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  constructor(@SkipSelf() private roomsService: RoomsService) { }

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("Request has been made");
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success !!')
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(' Request completed ', event.body)
        }
      }
      // console.log(data, "Dummy Photos Data")
    })

    // this.stream.subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('complete'),
    //   error: (error) => console.log(error)
    // })
    this.stream.subscribe(data => {
      console.log(data, "from observable 2")
    })

    // to take subscription
    this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
      this.roomList = rooms;
    });

    // this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
    console.log(this.headerComponent)
  }

  ngDoCheck(): void {
    console.log('on changes is called')
  }

  ngAfterViewInit() {
    // this.headerComponent.title = "Rooms View"
  }

  ngAfterViewChecked(): void {
    this.headerComponent.title = "Rooms View"

  }
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List New";
  }
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
    console.log(room)
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: "205",
      roomType: "Deluxe Room",
      amenities: 'AC, Free WIFI, TC',
      price: 700,
      photos: "https://www.makemytrip.com/hotels/photos-of-hotel_shivansh-details-nanpara.html",
      checkInTime: new Date('11-Nov-2023'),
      checkOutTime: new Date('12-Nov-2023')
    }
    console.log("Add Room Call")
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room]
    this.roomsService.addRooms(room).subscribe(rooms => {
      this.roomList = rooms;
    })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: "3",
      roomType: "Deluxe Room",
      amenities: 'AC, Free WIFI, TC',
      price: 700,
      photos: "https://www.makemytrip.com/hotels/photos-of-hotel_shivansh-details-nanpara.html",
      checkInTime: new Date('11-Nov-2023'),
      checkOutTime: new Date('12-Nov-2023')
    }

    this.roomsService.editRoom(room).subscribe(rooms => {
      this.roomList = rooms;
    })
  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
