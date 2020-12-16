class Queue{
    constructor(item = []) {
        this.item = item
    }
    Dequeue() {
        return this.item.shift()
    }
    Enqueue(ele) {
        return this.item.push(ele)
    }
    front() {
        return this.item[0]
    }
    isEmpty() {
        return this.item.length === 0
    }
    size() {
        return this.item.length
    }
}
exports.Queue = Queue

const q1 = new Queue([1,2,3,4,5,0])
// q1.Dequeue()
// console.log(q1)
// q1.Enqueue(100)
// console.log(q1)
// console.log(q1.front())
// console.log(q1.isEmpty())
// console.log(q1.size())

const people = new Queue([1,2,3,4,5,6,7,8,9])
function deliever(people, num) {
    for( let i = 0; i < num - 1 ; i++){
        people.Enqueue(people.front())
        people.Dequeue()
    }
    people.Dequeue() //第num个人
    console.log('delete')
    console.log(people.front())
    console.log(people)
    
    if(people.size() > 1){
        deliever(people, num)
    } 
    return people.front()
}
console.log(deliever(people, 5))

const people2 = new Queue(['Lily','Lucy','Tom','Lilei','why'])
console.log(deliever(people2, 3))