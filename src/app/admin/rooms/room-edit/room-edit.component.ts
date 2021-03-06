import {Component, Input, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../model/Room";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input()
  room: Room;

  layouts = Object.keys(Layout);
  layoutEnum = Layout;

  roomForm = new FormGroup(
    {
      roomName : new FormControl('roomName'),
      location: new FormControl('location')
    }
  );

  constructor() { }

  ngOnInit() {
    this.roomForm.patchValue({
      roomName: this.room.name,
      location: this.room.location
    });

    for (const layout of this.layouts) {
      this.roomForm.addControl(`layout${layout}`, new FormControl(`layout${layout}`));
    }
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location'];
    console.log(this.room);

    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }

    //call a method in the data service to save the room.
  }

}
