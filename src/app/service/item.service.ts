import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';

@Injectable()
export class ItemService {

  constructor() { }

  async findAll() {
    const keys = Object.keys(localStorage);
    let i = keys.length;
    const items = new Array<Item>();

    while ( i-- ) {
        if (!Number.isNaN(parseInt(keys[i]))) {
          items.push( JSON.parse(localStorage.getItem(keys[i])));
        }
    }

    return items;
  }

  async setItem(item: Item) {
    localStorage.setItem(item.cdJogo.toString(), JSON.stringify(item));
  }

  getItem(cdJogo: string): Item {
      return JSON.parse(localStorage.getItem(cdJogo));
  }

  getNextCdCode() {
    return Object.keys(localStorage).length++;
  }

}
