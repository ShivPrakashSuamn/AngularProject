import { Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() page = '';
  @Input() totalPage = '';
  @Output() newPage = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('Child Componet-',this.page)
  }
  pageChang(item: any) {
    this.page = item
    this.newPage.emit(item);
  }

  counter(i: number) {
    return new Array(i);
  }
}
