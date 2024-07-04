export default function(obj, keyField="id"){

    return Object.keys(obj).map( key => {

        let ret = {
            ...obj[key],
        }

        ret[keyField] = key;

        return ret;
    });
}