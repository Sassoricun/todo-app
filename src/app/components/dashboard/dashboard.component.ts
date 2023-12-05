import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void {
    console.log('BOARD - INIT');
  }

  onColorChange(color: string, columnId: number) {
    this.dashboardService.changeColumnColor(color, columnId)
  }

  addColumn(event: string) {
    if (event) {
      this.dashboardService.addColumn(event)
    }
  }

  onAddCard(text: string, columnId: number) {
    if (text) {
      this.dashboardService.addCard(text, columnId)
    }
  }

  onDeleteColumn(columnId: number) {
    this.dashboardService.deleteColumn(columnId)
  }

  onDeleteCard(cardId: number, columnId: number) {
    this.dashboardService.deleteCard(cardId, columnId)
  }

  onChangeLike(event: { card: any, increase: boolean }, columnId: number) {
    const { card: { id }, increase } = event
    this.dashboardService.changeLike(id, columnId, increase)
  }

  onAddComment(event: { id: number, text: string }, columnId: number) {
    this.dashboardService.addComment(columnId, event.id, event.text)
  }

  onDeleteComment(comment, columnId, item) {
    this.dashboardService.deleteComment(columnId, item.id, comment.id)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
