import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PopularTag } from '../../types/popularTag.type';

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tagList.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TagListComponent implements OnInit {
  @Input() tags: PopularTag[] = [];
  ngOnInit() {}
}
