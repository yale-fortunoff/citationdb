export default function (arr, key=x=>x) {
    const loaded = [];
    const ret =  arr
        .filter(x => { // x is a footnote
            const kx = key(x)
            if (!x) { return null }
            if (loaded.indexOf(kx) >= 0) {
                return false;
            }
            loaded.push(kx);
            return true;
        });
    return ret;
}         