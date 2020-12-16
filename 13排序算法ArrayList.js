class ArrayList {
    constructor() {
        this.array = []
    }
    insert(item) {
        this.array.push(item)
    }
    toString() {
        return this.array.join(' - ')
    }
    swap(i, j) {
        let temp = this.array[j]
        this.array[j] = this.array[i]
        this.array[i] = temp
    }
    bubble() {
        for(let i = 0; i<this.array.length - 1; i++) {
            for(let j = i+1; j<this.array.length; j++ ) {
                if(this.array[i] > this.array[j]) {
                    this.swap(i, j)
                }
            }
        }
    }
    selectionSort() {
        let length = this.array.length
        for(let j = 0; j<length - 1; j++){
            let min = j
            for(let i=min + 1; i<length; i++) {
                if(this.array[min] > this.array[i]) {
                    min = i
                }  
            }
            this.swap(j, min)
        }    
    }
    insertionSort() {
        let length = this.array.length
        for(let i = 1; i<length; i++) {
            let temp = this.array[i]
            let j = i
            while(temp < this.array[j - 1] && j > 0) {
                this.array[j] = this.array[j - 1]
                j--
            }
            this.array[j] = temp
        }
    }
    shellSort() {
        let gap = Math.floor(this.array.length/2)
        while(gap>=1) {
            for(let i = gap; i< this.array.length; i++) {
                let temp = this.array[i]
                let j = i
                //将满足条件的元素往后移动
                while(temp < this.array[j - gap] && j > gap -1) {
                    this.array[j] = this.array[j - gap]
                    j -= gap
                }
                //将第一个变量值变成我们要插进来的值
                this.array[j] = temp
            }
            gap = Math.floor(gap/2)
        }
    }
    medium(left, right) {
        let center = Math.floor((left + right)/2)
        if(this.array[left] > this.array[center]) {
            this.swap(left, right)
        }
        if(this.array[center] > this.array[right]) {
            this.swap(center, right)
        }
        if(this.array[left] > this.array[center]) {
            this.swap(left, center)
        }
        return center
    }
    quickSort() {
        this.array = this.quick(this.array)
    }
    quick(arr) {
        if(arr.length <= 1) return arr
        let pivotIndex = arr.length >> 1
        let pivot = arr.splice(pivotIndex,1)[0]
        let left = []
        let right = []
        for(let i = 0;i<arr.length;i++) {
            if(arr[i] <= pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return this.quick(left).concat(pivot,this.quick(right))
    }
}
let list = new ArrayList()
list.insert(666)
list.insert(88)
list.insert(12)
list.insert(100)
list.insert(5)
list.insert(566)
list.insert(23)
console.log(list.toString())
// list.bubble()
// console.log(list.toString())
// list.selectionSort()
// console.log(list.toString())
// list.insertionSort()
// console.log(list.toString())
// list.shellSort()
list.quickSort()
console.log(list.toString())