class PriorityQueue{
    constructor(item){
        this.item = item
    }
    enqueue(queueElement) {
        let add = false
        let push = true
        let index = 0
        for(let i = 0; i<this.item.length; i++){
            if(this.item.length === 0){
                this.item.push(queueElement)
                console.log('length')
            }else {
                if(this.item[i].priority < queueElement.priority){
                        // this.item.push(queueElement)
                        console.log("i:"+ i)
                        push = true
                        index = i
                    } else {
                        // this.item.splice(i,0,queueElement)
                        
                    }
            }   
        }
        if(push === true ){
            this.item.splice(index+1,0,queueElement)
        }
    }
}
const people = new PriorityQueue([
    {
        element: 'simon',
        priority: 1
    },
    {
        element: 'simon23',
        priority: 10
    },
    {
        element: 'simon33',
        priority: 100
    }
])
people.enqueue({element:'song', priority:22})
console.log(people.item)