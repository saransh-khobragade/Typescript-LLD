class ArrayList {
    private defaultCapacity: number = 1;
    private size = 0;
    private arr;
    constructor() {
        this.arr = new Array(this.defaultCapacity).fill(null);
    }
    ensureCapacity() {
        if (this.arr.length === this.size) {
            const newLength = this.size * 2;
            let newArray = new Array(newLength).fill(null);
            for (let i = 0; i < this.arr.length; i++) {
                newArray[i] = this.arr[i];
            }
            this.arr = newArray;
        }
    }
    add(item: number) {
        this.ensureCapacity();
        this.arr[this.size] = item;
        this.size += 1;
    }
    addAtIndex(index: number, item: number) {
        if (index < this.size) {
            this.arr[index] = item;
        } else {
            throw new Error("Out of index");
        }
    }
    removeAtIndex(index: number) {
        if (index < this.size) {
            this.arr[index] = null;
        } else {
            throw new Error("Out of index");
        }
    }
    getSize() {
        return this.size;
    }
}
const arr = new ArrayList();
arr.add(1);
arr.add(2);
arr.add(3);
arr.add(4);
arr.add(5);
