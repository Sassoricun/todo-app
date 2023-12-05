import { Component, EventEmitter, OnInit, Output } from '@angular/core';

enum colors {
  ONE = "#bdbdbd",
  TWO = "#c8e6c9",
  THREE = "#b3e5fc",
  FOUR = "#d1c4e9",
  FIVE = "#fce4ec",
  SIX = "#f0f4c3"
}

@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.scss']
})
export class ColorPanelComponent implements OnInit {
  @Output() emitColor: EventEmitter<string> = new EventEmitter();

  colorPickerOpen: boolean = false;

  colorsData = Object.values(colors)


  constructor() {

  }

  ngOnInit(): void {

  }

  onColorEmit(color: string) {
    this.emitColor.emit(color);
    this.toggleColorPicker();
  }
  toggleColorPicker() {
    this.colorPickerOpen = !this.colorPickerOpen;

  }
}
