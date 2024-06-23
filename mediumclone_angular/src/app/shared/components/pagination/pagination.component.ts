import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class PaginationComponent implements OnInit {
  @Input() total = 0;
  @Input() limit = 20;
  @Input() currentPage = 1;
  @Input() url = '';

  private utilService = inject(UtilsService);
  pagaesCount: number = 1;
  pages: number[] = [];

  ngOnInit() {
    this.pagaesCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pagaesCount > 0 ? this.utilService.range(1, this.pagaesCount) : [];
  }
}
