## SOLID PRINCIPLES

* S (Single Responsibility)
    - Single classed for single responsibilities
        ```
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
* L (Liscov substitution)
    - a child class should extend the parent class capability not narrow it down or change
    - if something is working with parent object it should always work with child's object too if substituted.
* I (Interface Segmented)
    - children class should not implement interface they do not need
    - split interfaces into simpler interfaces so that if child is implementing it can implement all functions.
* D (Dependency Inversion principle)
    - classed should depend on interfaces rather than concrete classes
    - while adding any property a interface object should be assigned so that later it can accept other for of object also without changing class structure.