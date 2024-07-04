export default class FussyArray extends Array {

    constructor(...items){
        super(...items);
        this.dict = {};
        this.ks = [];

        this.add = this.add.bind(this);
        this.addArray = this.addArray.bind(this);
    }

    add(key, value){
        if (!value){ value = key}
        if (this.ks.indexOf(String(key)) >= 0){ return; }
        if (this.ks.includes(key)){ return; }
        this.dict[key] = value;
        this.ks = Object.keys(this.dict);
        this.push(value);
        // console.log("Added ", value, " to ", this)
    }

    addArray(arr, keyFunc=x=>x){
        // arr.forEach( item => {
        //     this.add(keyFunc(item),item);

        // })
        for (var i = 0; i < arr.length; i++){
            this.add(keyFunc(arr[i]), arr[i]);
        }
    }

}