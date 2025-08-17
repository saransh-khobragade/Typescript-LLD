## SOLID PRINCIPLES

* S (Single Responsibility)
    - Single classed for single responsibilities
        ```js
        class InvoiceItem {
            constructor(public price: number, public quantity: number) {}
            getTotal(): number {
                return this.price * this.quantity;
            }
        }

        class Invoice {
            private readonly items: InvoiceItem[] = [];
            getTotal(): number {
                return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
            }
        }

        // Separate printing (presentation) concern
        class InvoicePrinter {
            print(invoice: Invoice): void {
                console.log(`Total: $${invoice.getTotal()}`);
            }
        }
        ```
* O (Open for extension and closed for modification)
    - child classes can extend base parent class instead of changing parent class structure
        ```js
        interface DiscountStrategy {
            getDiscount(): number;
        }

        class RegularDiscount implements DiscountStrategy {
            getDiscount(): number {
                return 5;
            }
        }

        class PremiumDiscount implements DiscountStrategy {
            getDiscount(): number {
                return 10;
            }
        }
        //Each child can extend parent class but parent should not change on later new requirement
        ```
* L (Liscov substitution)
    - a child class should extend the parent class capability not narrow it down or change
    - if something is working with parent object it should always work with child's object too if substituted.
    - You’re not allowing a subclass to override behavior in a way that breaks the expectations of the parent.
        ```js
        class Bird {}

        class FlyingBird extends Bird {
            fly(): void {
                console.log("Flying high!");
            }
        }

        class Eagle extends FlyingBird {}
        class Ostrich extends Bird {} // doesn't extend FlyingBird

        function makeFlyingBirdFly(bird: FlyingBird): void {
            bird.fly(); // ✅ Safe
        }

        makeFlyingBirdFly(new Eagle()); // ✅ Works fine, You can substitute an instance of Eagle (a subclass of FlyingBird) wherever a FlyingBird is expected, and it works correctly.
        // You cannot substitute an Ostrich (which is just a Bird, not a FlyingBird) into makeFlyingBirdFly(), and TypeScript correctly prevents that.
        ```
* I (Interface Segmented)
    - children class should not implement interface they do not need
    - split interfaces into simpler interfaces so that if child is implementing it can implement all functions.
        ```js
        interface Workable {
            work(): void;
        }

        interface Eatable {
            eat(): void;
        }

        class HumanWorker implements Workable, Eatable {
            work(): void {
                console.log("Working...");
            }
            eat(): void {
                console.log("Eating...");
            }
        }

        class RobotWorker implements Workable {
            work(): void {
                console.log("Working...");
            }
        }
        ```
* D (Dependency Inversion principle)
    - classed should depend on interfaces rather than concrete classes
    - while adding any property a interface object should be assigned so that later it can accept other for of object also without changing class structure.
        ```js
        // Abstraction
        interface Database {
            connect(): void;
        }

        // Low-level module
        class MySQLDatabase implements Database {
            connect() {
                console.log("Connected to MySQL");
            }
        }

        // Another possible low-level module
        class MongoDBDatabase implements Database {
            connect() {
                console.log("Connected to MongoDB");
            }
        }

        // High-level module depends on abstraction
        class UserService {
            constructor(private db: Database) {}

            getUser() {
                this.db.connect();
                console.log("Getting user...");
            }
        }
        ``` 