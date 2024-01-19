import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private initDashboard = [

  ]

  private dasboard: any[] = this.initDashboard
  private dashboard$ = new BehaviorSubject<any[]>(this.initDashboard)

  getDashboard$() {
    return this.dashboard$.asObservable()
  }

  changeColumnColor(color: string, columnId: number) {
    this.dasboard = this.dasboard.map((column: any) => {
      if (column.id === columnId) {
        column.color = color;
      }
      return column;
    });
    this.dashboard$.next([...this.dasboard]);
  }

  addColumn(title: string) {
    const newColumn: any = {
      id: Date.now(),
      title: title,
      color: 'primary',
      list: [],
    };
    this.dasboard = [...this.dasboard, newColumn];
    this.dashboard$.next([...this.dasboard]);
  }

  addCard(text: string, columnId: number) {
    const newCard: any = {
      id: Date.now(),
      text,
      like: 0,
      comments: [],
    };
    this.dasboard = this.dasboard.map((column: any) => {
      if (column.id === columnId) {
        column.list = [newCard, ...column.list];
      }
      return column;
    });
    this.dashboard$.next([...this.dasboard]);
  }

  deleteColumn(columnId: number) {
    this.dasboard = this.dasboard.filter((column: any) => column.id !== columnId);
    this.dashboard$.next([...this.dasboard]);
  }

  deleteCard(cardId: number, columnId: number) {
    this.dasboard = this.dasboard.map((column: any) => {
      if (column.id === columnId) {
        column.list = column.list.filter((card: any) => card.id !== cardId);
      }
      return column;
    });
    this.dashboard$.next([...this.dasboard]);
  }

  changeLike(cardId: number, columnId: number, increase: boolean) {
    this.dasboard = this.dasboard.map((column: any) => {
      if (column.id === columnId) {
        const list = column.list.map((card: any) => {
          if (card.id === cardId) {
            if (increase) {
              card.like++;
            } else {
              if (card.like > 0) {
                card.like--;
              }
            }
          }
          return card;
        });
        column.list = list;
        return column;
      } else {
        return column;
      }
    });
    this.dashboard$.next([...this.dasboard]);
  }

  addComment(columnId: number, cardId: number, text: string) {
    this.dasboard = this.dasboard.map((column: any) => {
      if (column.id === columnId) {
        const list = column.list.map((card: any) => {
          if (card.id === cardId) {
            const newComment = {
              id: Date.now(),
              text,
            };
            card.comments = [newComment, ...card.comments];
          }
          return card;
        });
        column.list = list;
      }
      return column;
    });
    this.dashboard$.next([...this.dasboard]);
  }

  deleteComment(columnId: number, itemId: number, commentId: number) {
    this.dasboard = this.dasboard.map((column: any) => {
      if (column.id === columnId) {
        const list = column.list.map((item: any) => {
          if (item.id === itemId) {
            item.comments = item.comments.filter((comment: any) => {
              return comment.id !== commentId
            })
          }
          return item
        })
        column.list = list
      }
      return column
    })
    this.dashboard$.next([...this.dasboard])
  }

  constructor() { }
}
