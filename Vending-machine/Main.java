class Item {
    String name;
    double price;
    boolean isAvailable = true;

    public Item(String name, double price) {
        this.name = name;
        this.price = price;
    }
}
interface VendingMachineState {
    void selectItem(VendingMachine machine, int row, int col);
    void insertMoney(VendingMachine machine, double amount);
    void dispenseItem(VendingMachine machine);
    void cancelTransaction(VendingMachine machine);
}

class VendingMachine {
    Item[][] shelf = new Item[5][3];
    VendingMachineState currentState;
    double currentBalance = 0.0;

    VendingMachine() {
        currentState = new IdleState();
        shelf[0][0] = new Item("Coke", 1.5);
        shelf[0][1] = new Item("Pepsi", 1.5);
        shelf[0][2] = new Item("Sprite", 1.5);
        shelf[1][0] = new Item("Snickers", 2.0);
        shelf[1][1] = new Item("Mars", 2.0);
        shelf[1][2] = new Item("Twix", 2.0);
        shelf[2][0] = new Item("Lays", 1.0);
        shelf[2][1] = new Item("Doritos", 1.0);
        shelf[2][2] = new Item("Cheetos", 1.0);
    }
}

public class Main{
    public static void main(String[] args) {
            System.out.println("Vending Machine");
            VendingMachine machine = new VendingMachine();
            machine.currentState.insertMoney(machine,5.0);
            machine.currentState.insertMoney(machine, 5.0);
            machine.currentState.selectItem(machine, 0, 0);
            machine.currentState.dispenseItem(machine);
            machine.currentState.cancelTransaction(machine);
        }
}

class IdleState implements VendingMachineState {
    public void selectItem(VendingMachine machine, int row, int col) {
        throw new UnsupportedOperationException("Select item operation not supported in Idle state.");
    }
    public void insertMoney(VendingMachine machine, double amount) {
        System.out.println("Money inserted: " + amount);
        machine.currentBalance += amount;
        machine.currentState = new CollectMoneyState();
    }
    public void dispenseItem(VendingMachine machine) {
        throw new UnsupportedOperationException("Select item operation not supported in Idle state.");
    }
    public void cancelTransaction(VendingMachine machine) {
        throw new UnsupportedOperationException("Select item operation not supported in Idle state.");
    }
}

class CollectMoneyState implements VendingMachineState {
    public void selectItem(VendingMachine machine, int row, int col) {
        System.out.println("Item selected at position: " + row + ", " + col);
        Item selectedItem = machine.shelf[row][col];
        if (selectedItem == null || !selectedItem.isAvailable || machine.currentBalance < selectedItem.price) {
            System.out.println("Selected item is not available.");
            return;
        }
        machine.currentState = new ItemSelectedState(selectedItem);
    }
    public void insertMoney(VendingMachine machine, double amount) {
        System.out.println("Money inserted: " + amount);
        machine.currentBalance += amount;
        machine.currentState = new CollectMoneyState();
    }
    public void dispenseItem(VendingMachine machine) {
        throw new UnsupportedOperationException("Dispense item operation not supported in Collect Money state.");
    }
    public void cancelTransaction(VendingMachine machine) {
        System.out.println("Transaction cancelled. Returning money... " + machine.currentBalance);
        machine.currentState = new IdleState();
        machine.currentBalance = 0;

    }
}

class ItemSelectedState implements VendingMachineState {
    Item item;
    ItemSelectedState(Item item) {
        this.item = item;
        System.out.println("Item selected: " + item.name);
    }
    public void selectItem(VendingMachine machine, int row, int col) {
        throw new UnsupportedOperationException("Select item operation not supported in Select Item state.");
    }
    public void insertMoney(VendingMachine machine, double amount) {
        throw new UnsupportedOperationException("Insert money operation not supported in Select Item state.");
    }
    public void dispenseItem(VendingMachine machine) {
        System.out.println("Dispensing item...");
        machine.currentBalance -= item.price;
        machine.shelf[0][0].isAvailable = false; // Assuming item is dispensed from position (0,0) for simplicity
        machine.currentState = new DispensedItemState();
    }
    public void cancelTransaction(VendingMachine machine) {
        System.out.println("Transaction cancelled. Returning money... " + machine.currentBalance);
        machine.currentState = new IdleState();
        machine.currentBalance = 0;
    }
}

class DispensedItemState implements VendingMachineState {
    public void selectItem(VendingMachine machine, int row, int col) {
        System.out.println("Item selected at position: " + row + ", " + col);
        Item selectedItem = machine.shelf[row][col];
        if (selectedItem == null || !selectedItem.isAvailable || machine.currentBalance < selectedItem.price) {
            System.out.println("Selected item is not available.");
            return;
        }
        machine.currentState = new ItemSelectedState(selectedItem);
    }
    public void insertMoney(VendingMachine machine, double amount) {
        throw new UnsupportedOperationException("Insert money operation not supported in Dispense Item state.");
    }
    public void dispenseItem(VendingMachine machine) {
        throw new UnsupportedOperationException("Dispense item operation not supported in Dispense Item state.");
    }
    public void cancelTransaction(VendingMachine machine) {
        System.out.println("Transaction cancelled. Returning money... " + machine.currentBalance);
        machine.currentState = new IdleState();
        machine.currentBalance = 0;
    }
}