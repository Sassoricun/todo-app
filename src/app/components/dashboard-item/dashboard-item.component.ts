import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {

  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> = new EventEmitter();
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();

  commentInput = ''
  open = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openEditModal() {
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: { text: this.item.text, description: this.item.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item.text = result.title;
        this.item.description = result.description;
      }
    });
  }
  onOpenComment() {
    this.open = !this.open
  }
  onCommentTextEmit(id: number) {
    this.emitText.emit({ id, text: this.commentInput });
    this.commentInput = ''
  }
  onCardItemEmit(card: any, increase: boolean) {
    this.emitCardItem.emit({ card, increase });
  }
  onCardDelete(id: number) {
    this.emitDeleteCard.emit(id)
  }
}

