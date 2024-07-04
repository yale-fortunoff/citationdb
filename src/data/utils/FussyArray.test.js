import FussyArray from "./FussyArray";

it('Can add items to fussy array', () => {

    let farr = new FussyArray();
    for (var i = 0; i < 100; i++){
        farr.add(i, i);
    }

    expect(farr.length).toBe(100);
});

it('Cannot add duplicate items to fussy array', () => {

    let farr = new FussyArray();
    for (var i = 0; i < 100; i++){
        farr.add(i, i * 100);
    }

    for (var i = 0; i < 100; i++){
        farr.add(i, i * 100);
    }

    expect(farr.length).toBe(100);
});

it('Cannot addArray duplicate items', () => {

    let farr = new FussyArray();
    for (var i = 0; i < 100; i++){
        farr.add(i, i * 100);
    }

    let farr2 = new FussyArray();
    for (var i = 0; i < 100; i++){
        farr2.add(i, i * 100);
    }

    farr2.addArray(farr, x=>x / 100);

    expect(farr.length).toBe(100);
    expect(farr2.length).toBe(100);

});
