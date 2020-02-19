type Exclude<T, U> = T extends U ? never : T;

export interface IEntity {
  id: string;
}

// function Preload<T, S>( s: S, sKey: keyof S) :T[] {
//   if (typeof s[sKey] === typeof T) {
//     return s[sKey] as unknown as T[]
//   }
// }

export class List<T extends IEntity> {
  private data: T[];
  private nextID: number;

  constructor(...elements: T[]) {
    this.data = elements;
    this.nextID = elements.length;
  }

  add(t: T): T | null {
    if (t.id !== '') {
      const existedDt = this.data.filter(itm => itm.id === t.id);
      if (existedDt.length > 0) {
        return null;
      }
    }
    t.id = this.genNextID();
    this.data.push(t);
    return t;
  }

  genNextID(): string {
    this.nextID = this.nextID + 1;
    return this.nextID.toString();
  }

  remove(id: string): boolean {
    if (id === '') {
      return false;
    }

    let index = this.data.findIndex(itm => itm.id === id);
    if (index < 0) {
      return false;
    }

    this.data.splice(index, 1);
    return true;
  }

  list(cond?: (item: T) => boolean): T[] {
    return cond ? this.data.filter(itm => cond(itm)) : this.data;
  }

  getById(id: string): T | null {
    if (id === '') {
      return null;
    }

    if (this.data.length <= 0) {
      return null;
    }

    return this.data.find(itm => itm.id === id) || null;
  }

  update(updateData: Partial<T>, compareFn: (itm: T) => boolean): T | null {
    const idx = this.data.findIndex(itm =>
      updateData.id ? itm.id === updateData.id : compareFn(itm)
    );
    if (idx < 0) {
      return null;
    }

    const newItm = Object.assign({}, this.data[idx], updateData);

    this.data[idx] = newItm;

    return newItm;
  }
}
