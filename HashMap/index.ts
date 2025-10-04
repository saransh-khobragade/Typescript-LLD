class Item {
    key: string;
    value: any;
    next: Item | null;
    constructor(key: string, value: any, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
class HashMap {
    size = 0;
    capacity = 2;
    bucket: Item[] | null[];

    constructor() {
        this.bucket = new Array(this.capacity).fill(null);
    }
    getHash(key: string) {
        let str = String(key);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
        }
        return hash % this.capacity;
    }
    put(key: string, value: any) {
        const hashKey = this.getHash(key);

        if (hashKey < this.capacity) {
            let head = this.bucket[hashKey];
            if (head) {
                while (head.next != null) {
                    head = head.next;
                }
                head.next = new Item(key, value);
            } else {
                this.bucket[hashKey] = new Item(key, value);
                this.size += 1;
            }
        }

        if (this.size / this.capacity >= 0.75) {
            this.resize();
        }
    }
    resize() {
        this.capacity = this.capacity * 2;
        const oldBucket = this.bucket;
        this.bucket = new Array(this.capacity).fill(null);
        this.size = 0;

        for (let head of oldBucket) {
            while (head) {
                this.put(head.key, head.value);
                head = head.next;
            }
        }
    }
}

const hmap = new HashMap();
hmap.put("a", 1);
hmap.put("b", 2);
hmap.put("c", 3);
hmap.put("d", 3);
hmap.put("e", 3);
console.log(hmap.bucket);
