
class hashTable{
    constructor() {
        this.storage = []
        this.count = 0
        this.limit = 7
    }
    hasFunc(data, length) {
        let hasCode = 0
        let prime = 37
        return data.split('').reduce((total, value, index, arr) => {
            total = total*prime + value.charCodeAt(0)
            if( index === arr.length - 1 ) {
                total%=length
            }
            return total
        }, 0)
    }
    put(key, value) {
        let index = this.hasFunc(key, this.limit)
        console.log(this.limit)
        let isThere = false
        if(this.storage[index] == null) {
            this.storage[index] = []
        }
        this.storage[index].forEach(data => {
            if(data[0] === key) {
                data[1] = value
                isThere = true
                return 
            }
        })
        if( !isThere ) {
            this.storage[index].push([key, value])
            this.count++
            if(this.count/this.limit > 0.75) {
                this.resize(this.limit*2)
            }
        }
        return
    }
    get(key) {
        let hashCode = this.hasFunc(key, this.limit)
        let result = undefined
        if(this.storage[hashCode] == null) {
            result = false
            return result
        }
        this.storage[hashCode].forEach((value, index) => {
            if(value[0] === key) {
                result = value[1]
                return
            }
            result = false
        })
        return result
    }
    remove(key) {
        let index = this.hasFunc(key, this.limit)
        let bucket = this.storage[index]
        if(bucket == null) return false
        bucket.forEach((element,index, arr) => {
            if(element[0] == key) {
                arr.splice(index,1)
                this.count--
                if(this.limit>7 && this.count/this.limit < 0.25) {
                    this.resize(Math.floor(this.limit/2))
                }
                return true
            }
        });
    }
    isEmpty() {
        return this.storage.length === 0
    }
    resize(newLimit) {
        while(!isPrime(newLimit)) {
            console.log("not a prime")
            newLimit++
        } 
        let oldStorage = this.storage
        this.count = 0
        this.limit = newLimit
        console.log(this.limit)
        oldStorage.forEach(element => {
            let bucket = element
            if(!bucket) {
                bucket.forEach((data, index) => {
                    let tuple = data
                    this.put(tuple[0], tuple[1])
                    this.count++
                })
            }
        });
    }
}
function isPrime(num) {
    Prime = true
    for(let i = 2 ;i<=Math.sqrt(num) ; i++) {
        if(num%i === 0) {
            Prime = false
        }
    }
    return Prime
}
function primeMap(num) {
    let result = new Array(num)
    for(let i=0;i<num;i++) {
        result[i] = true
    }
    for(let i=3;i<num;i++) {
        if(result[i]) {
            result[i] = isPrime(i)
            for(let j=2;i*j<num;j++) {
                result[i*j] = false
            }
        }
    }
    return result
}

// console.log(hasFunc('ebcd', 7))
// console.log(hasFunc('abc', 7))
// console.log(hasFunc('nba', 7))
// console.log(hasFunc('mba', 7))
let h1 = new hashTable()
h1.put('abc', 123123)
h1.put('abc', 1232123123)
h1.put('abd', 123123)
h1.put('abe', 1232123123)
h1.put('abq', 123123)
h1.put('asc', 1232123123)
h1.put('add', 123123)
h1.put('acc', 1232123123)
h1.put('aqd', 123123)
// console.log(h1.storage)
// console.log(h1.get('abc'))
h1.remove('abc')
// console.log(h1.storage)
// console.log(h1.get('abc'))
console.log("-------------\n",h1.storage)
// primeMap(100)
// console.log("-------------\n",primeMap(100))
// console.log(isPrime(4))

