class Item {
    key: string;
    value: any;
    next: Item | null;
    constructor(key: string, value: any, next: Item | null) {
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
        let head = this.bucket[hashKey];

        //checking if already key present so replacing value
        let curr = head;
        while (curr) {
            if (curr.key === key) {
                curr.value = value;
                return;
            }
            curr = curr.next;
        }

        //1.if hash present but key is different,(add new node at first,shifting head as next)
        //2.new key new hash,(head will be null)
        this.bucket[hashKey] = new Item(key, value, head);
        this.size += 1;

        if (this.size / this.capacity >= 0.75) {
            this.resize();
        }
    }
    has(key: string) {
        if (this.get(key) != null) {
            return true;
        } else {
            return false;
        }
    }
    get(key: string) {
        const hashKey = this.getHash(key);
        let head = this.bucket[hashKey];
        if (head) {
            while (head) {
                if (head.key === key) {
                    return head;
                }
                head = head.next;
            }
        }
        return null;
    }
    delete(key: string) {
        const hashKey = this.getHash(key);
        let head = this.bucket[hashKey];

        if (head?.key == key) {
            this.bucket[hashKey] = null;
            this.size -= 1;
        }
        while (head) {
            if (head.key == key) {
                head = head.next;
                this.size -= 1;
                return;
            }
            head = head.next;
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
hmap.put("a", 2);
hmap.put("c", 3);
hmap.put("d", 3);
hmap.put("e", 3);
console.log(hmap.get("e")); //Item {key: 'e', value: 3, next: null}
console.log(hmap.has("e")); //true
hmap.delete("e");
console.log(hmap.has("e")); //false
