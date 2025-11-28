export type TreeItem = {
  id: string | number
  label: string
  parent: string | number | null
}

class TreeStore {
  private items: Map<string, TreeItem>

  constructor(items: Array<TreeItem>) {
    this.items = new Map(items.map((item) => [String(item.id), item]))
  }

  public getAll(): TreeItem[] {
    return [...this.items.values()]
  }

  public getItem(id: string | number): TreeItem | undefined {
    return this.items.get(String(id))
  }

  public getChildren(id: string | number): TreeItem[] {
    return this.getAll().filter((item) => item.parent === id)
  }

  public getAllChildren(id: string | number): TreeItem[] {
    const children = this.getChildren(id)

    return children.flatMap((child) => [child, ...this.getAllChildren(child.id)])
  }

  public getAllParents(id: string | number): TreeItem[] {
    const item = this.getItem(id)

    if (!item || !item.parent) {
      return []
    }

    const parent = this.getItem(item.parent)

    if (!parent) {
      return []
    }

    return [parent, ...this.getAllParents(parent.id)]
  }

  public addItem(item: TreeItem) {
    this.items.set(String(item.id), item)
  }

  public removeItem(id: string | number) {
    this.items.delete(String(id))
  }

  public updateItem(item: TreeItem) {
    this.items.set(String(item.id), item)
  }
}

export default TreeStore
