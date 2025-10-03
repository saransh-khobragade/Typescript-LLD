class Item {
    name;
    price;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}
interface MachineState {
    insert(machine: VendingMachine, coin: number): void;
    select(machine: VendingMachine, itemName: string): void;
    dispense(machine: VendingMachine): void;
    cancel(machine: VendingMachine): void;
}

class IdleState implements MachineState {
    insert(machine: VendingMachine, coin: number) {
        machine.currentBalance += coin;
        machine.currentState = new CollectMoneyState(coin);
    }
    select(machine: VendingMachine) {
        throw new Error("wrong operation at this state");
    }
    dispense(machine: VendingMachine) {
        throw new Error("wrong operation at this state");
    }
    cancel(machine: VendingMachine) {
        throw new Error("wrong operation at this state");
    }
}
class CollectMoneyState implements MachineState {
    coin = 0;
    constructor(coin: number) {
        this.coin += coin;
    }
    insert(machine: VendingMachine, coin: number) {
        machine.currentBalance += coin;
        machine.currentState = new CollectMoneyState(coin);
    }
    select(machine: VendingMachine, itemName: string) {
        const item = machine.shelf.find((x) => x.name == itemName);
        if (item) {
            machine.currentState = new ItemSelectState(item);
        }
    }
    dispense(machine: VendingMachine) {
        throw new Error("wrong operation at this state");
    }
    cancel(machine: VendingMachine) {
        machine.currentState = new IdleState();
    }
}
class ItemSelectState implements MachineState {
    item;
    constructor(item: Item) {
        this.item = item;
    }
    insert(machine: VendingMachine, coin: number) {
        machine.currentState = new CollectMoneyState(coin);
    }
    select(machine: VendingMachine) {
        throw new Error("wrong operation at this state");
    }
    dispense(machine: VendingMachine) {
        if (this.item.price < machine.currentBalance) {
            machine.currentBalance -= this.item.price;
            const index = machine.shelf.indexOf(this.item);
            if (index != -1) {
                machine.shelf.splice(index, 1);
            }
        }
        machine.currentState = new DispenseItemState();
    }
    cancel(machine: VendingMachine) {
        machine.currentState = new IdleState();
    }
}
class DispenseItemState implements MachineState {
    insert(machine: VendingMachine, coin: number) {
        machine.currentState = new CollectMoneyState(coin);
    }
    select(machine: VendingMachine, itemName: string) {
        const item = machine.shelf.find((x) => x.name == itemName);
        if (item) {
            machine.currentState = new ItemSelectState(item);
        }
    }
    dispense(machine: VendingMachine) {
        throw new Error("wrong operation at this state");
    }
    cancel(machine: VendingMachine) {
        machine.currentState = new IdleState();
    }
}

class VendingMachine {
    shelf: Item[] = [
        new Item("buiscuit", 10),
        new Item("choclate", 20),
        new Item("miranda", 30),
    ];
    currentBalance = 0;
    currentState: MachineState;

    constructor() {
        this.currentState = new IdleState();
    }
}

const vendingMachine = new VendingMachine();
vendingMachine.currentState.insert(vendingMachine, 50);
vendingMachine.currentState.select(vendingMachine, "miranda");
vendingMachine.currentState.dispense(vendingMachine);
console.log("currentBalance", vendingMachine.currentBalance); //currentBalance 20
