class Slab {
    public from: number;
    public to: number;
    public taxPercentage: number;

    constructor(from: number, to: number, percentage: number) {
        this.from = from;
        this.to = to;
        this.taxPercentage = percentage;
    }
}
class IncomeTax {
    public slab: Slab[] = [];
    public flatTaxPercentage: number;

    constructor() {
        this.flatTaxPercentage = 30;
    }

    addSlab(from: number, to: number, percentage: number) {
        this.slab.push(new Slab(from, to, percentage));
        this.slab.sort((x, y) => x.to - y.to);
    }

    calculateTax(amount: number) {
        let totalTax = 0;

        for (let x of this.slab) {
            if (amount > x.to) {
                totalTax += ((x.to - x.from) * x.taxPercentage) / 100;
            } else if (amount > x.from && amount < x.to) {
                totalTax += ((amount - x.from) * x.taxPercentage) / 100;
            }
        }
        if (amount > this.slab[this.slab.length - 1].to) {
            totalTax +=
                ((amount - this.slab[this.slab.length - 1].to) *
                    this.flatTaxPercentage) /
                100;
        }

        return totalTax;
    }
}

const incomeTax = new IncomeTax();
incomeTax.addSlab(0, 5000, 5);
incomeTax.addSlab(5001, 10000, 10);
incomeTax.addSlab(10001, 30000, 15);

incomeTax.calculateTax(50000);
