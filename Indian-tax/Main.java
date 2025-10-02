import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Slab {
    int from;
    int to;
    int taxPercentage;

    public Slab(int from, int to, int percentage) {
        this.from = from;
        this.to = to;
        this.taxPercentage = percentage;
    }
}

class IncomeTax {
    private List<Slab> slabs = new ArrayList<>();
    private int flatTaxPercentage;

    public IncomeTax() {
        this.flatTaxPercentage = 30;
    }

    public void addSlab(int from, int to, int percentage) {
        slabs.add(new Slab(from, to, percentage));
        slabs.sort(Comparator.comparingInt(s -> s.to));
    }

    public double calculateTax(int amount) {
        double totalTax = 0;

        for (Slab slab : slabs) {
            if (amount > slab.to) {
                totalTax += ((slab.to - slab.from) * slab.taxPercentage) / 100.0;
            } else if (amount > slab.from && amount < slab.to) {
                totalTax += ((amount - slab.from) * slab.taxPercentage) / 100.0;
            }
        }

        if (!slabs.isEmpty() && amount > slabs.get(slabs.size() - 1).to) {
            totalTax += ((amount - slabs.get(slabs.size() - 1).to) * flatTaxPercentage) / 100.0;
        }

        return totalTax;
    }
}

public class Main {
    public static void main(String[] args) {
        IncomeTax incomeTax = new IncomeTax();
        incomeTax.addSlab(0, 5000, 5);
        incomeTax.addSlab(5001, 10000, 10);
        incomeTax.addSlab(10001, 30000, 15);

        double tax = incomeTax.calculateTax(50000);
        System.out.println("Total Tax: " + tax);
    }
}
