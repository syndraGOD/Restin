const input = 6;
class Node {
  constructor(value, Node, Node) {
    this.value = value;
    this.next = Node;
    this.prev = Node;
  }
}
class List {
  constructor() {
    this.head = null;
    this.tail = Node();
    this.length = 0;
  }
  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    this.tail = newNode;
    this.length++;
  }
  unshift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
    }
    this.head = newNode;
    this.length++;
  }
  pop() {
    if (!this.tail) {
      return null;
    }
    const returnVal = this.tail.value;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length--;
    return returnVal;
  }
  shift() {
    if (!this.head) {
      return null;
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.length--;
  }
  getLength() {
    return this.length;
  }
  result() {
    if (!this.head) {
      return null;
    } else {
      return this.head.value;
    }
  }
}
const list = new List();
for (let i = input; i > 0; i--) {
  list.push(i);
}
function func() {
  list.pop();
  const num = list.pop();
  list.unshift(num);
}
while (list.getLength() > 1) {
  func();
}
console.log(list.result());
