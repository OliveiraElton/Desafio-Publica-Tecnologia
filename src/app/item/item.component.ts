import { Component, OnInit, Input, Output } from '@angular/core';
import { Item } from '../model/item.model';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];
  msgs: Message[] = [];
  @Input() selectedItem: Item;

  constructor(private itemService: ItemService, private router: Router,
    private confirmationService: ConfirmationService) { }

  async ngOnInit() {
    this.findAll();
  }

  redirectToList() {
    this.router.navigate(['/item/edit']);
  }

  findAll() {
    this.itemService.findAll().then(items => {
      this.items = [
        ...items
      ];
      this.items.sort((a, b) => {
        return a.cdJogo - b.cdJogo;
      });
    });
  }

}
