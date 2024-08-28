// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Escrow {
    address root;
    uint fees = 0.1 ether;
    enum EscrowStatus {
        Paid,
        Submitted,
        Disputed,
        Finalized
    }
    struct Task {
        address receiver;
        uint amount;
        EscrowStatus completed;
        string description;
    }

    // modifiers
    modifier onlyOwner() {
        require(msg.sender == root, "You are not the owner");
        _;
    }

    Task[] EscrowTasks;
    mapping(address => uint[]) senders;
    mapping(address => uint[]) receivers;

    // settings smart contract owner as root owner of every acccount
    constructor() {
        root = msg.sender;
    }

    function saySomething() external view returns (address) {
        return root;
    }

    function createTask(
        address receiver,
        uint amount,
        string memory description
    ) external payable {
        // require(tasks[msg.sender].length == 0, "Task already exists");
        require(msg.value == amount + fees, "Incorrect amount sent");
        EscrowTasks.push(
            Task(receiver, amount, EscrowStatus.Paid, description)
        );
        senders[msg.sender].push(EscrowTasks.length - 1);
        receivers[receiver].push(EscrowTasks.length - 1);
    }

    function submitTask(address recv, uint id) external {
        uint[] storage ListOfTasks = receivers[recv];
        bool isReceiver = false;
        for (uint i = 0; i < ListOfTasks.length; i++) {
            if (ListOfTasks[i] == id) {
                isReceiver = true;
                break;
            }
        }

        require(
            isReceiver == true || msg.sender == root,
            "You are not the receiver/root"
        );
        require(
            EscrowTasks[id].completed == EscrowStatus.Paid,
            "Task already submitted"
        );
        EscrowTasks[id].completed = EscrowStatus.Submitted;
    }

    function disputeTask(address sender, uint id) external {
        uint[] storage ListOfTasks = senders[sender];
        bool isSender = false;
        for (uint i = 0; i < ListOfTasks.length; i++) {
            if (ListOfTasks[i] == id) {
                isSender = true;
                break;
            }
        }
        require(
            isSender == true || msg.sender == root,
            "You are not the receiver/root"
        );
        require(
            EscrowTasks[id].completed == EscrowStatus.Finalized ||
                EscrowTasks[id].completed == EscrowStatus.Disputed,
            "Task already Finalized/Disputed"
        );
        EscrowTasks[id].completed = EscrowStatus.Disputed;
    }

    function finalizeTask(address sender, uint id) external {
        uint[] storage ListOfTasks = senders[sender];
        bool isSender = false;
        for (uint i = 0; i < ListOfTasks.length; i++) {
            if (ListOfTasks[i] == id) {
                isSender = true;
                break;
            }
        }
        require(
            isSender == true || msg.sender == root,
            "You are not the sender/root"
        );
        require(
            EscrowTasks[id].completed == EscrowStatus.Finalized,
            "Task already finalized"
        );
        EscrowTasks[id].completed = EscrowStatus.Finalized;
    }
}
