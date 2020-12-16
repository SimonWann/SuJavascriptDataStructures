class Dictionary {
    constructor() {
        this.items = {}
    }
    set(key, value) {
        this.items[key] = value
    }
    has(key) {
        return this.items.hasOwnProperty(key)
    }
    remove(key) {
        if(!this.has(key)) return
        delete this.items[key]
        return true
    }
    get(key) {
        if(this.has(key))
        return this.items[key]
    }
    keys() {
        return Object.keys(this.items)
    }
}

exports.Dictionary = Dictionary