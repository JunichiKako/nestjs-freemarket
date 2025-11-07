import { Injectable, NotFoundException } from '@nestjs/common';
import type { Item } from './items.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    const found = this.items.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    return found;
  }

  create(item: Item): Item {
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);

    item.status = 'SOLD_OUT';
    return item;
  }

  delete(id: string): Item {
    const item = this.findById(id);
    this.items = this.items.filter((item) => item.id !== id);
    return item;
  }
}
