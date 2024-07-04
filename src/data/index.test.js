import Data from "./index";
import { Exception } from "handlebars";

// reminding myself how to use Jest
test("One plus one is two", ()=>{
    expect(1 + 1).toBe(2);
})

test ("Can get a resource by id", ()=>{
    expect(Data.resource.byId("HVT-0001")["title"]).toBe("Eva B. Holocaust testimony");

})

test("Can get number of resources cited by an author", ()=>{
    expect(Data.publication.byAuthor("langer-lawrence-l").length).toBeGreaterThan(0)
    
})

test ("Can get publications by an author", () => {

    expect(Data.publication.byAuthor("langer-lawrence-l").length).toBeGreaterThan(0);

});

test ("Can get footnotes by an author", () =>{

    expect(Data.footnote.byAuthor("langer-lawrence-l").length).toBeGreaterThan(5);
})

test ("Can get footnotes by publication ID", () =>{

    expect(Data.footnote.byPublication("e6797972").length).toBeGreaterThan(10)
})

test("Can get footnotes by resource ID", () =>{

    expect(Data.footnote.byResource("HVT-0001").length).toBeGreaterThan(0);
})

test("Can get number of resources cited by an author", ()=>{

    expect(Data.resource.citedByAuthor("langer-lawrence-l").length).toBeGreaterThan(1);
    // expect(Data.resource.citedByAuthor("langer-lawrence-l")).toBeInstanceOf(Array);
    // expect(Data.resource.citedByAuthor("langer-lawrence-l")[0]).not.toBeUndefined();

})

test ("Can get footnotes appearing in a publication", ()=> {

    expect(Data.footnote.byPublication("e6797972").length).toBeGreaterThan(10);
    expect(Data.footnote.byPublication("XXXX")).toBeInstanceOf(Array)
    expect(Data.footnote.byPublication("XXXX").length).toBe(0);



});

test("Can get number of resources appearing in a publication", () =>{

    expect(Data.resource.byPublication("e6797972").length).toBeGreaterThan(1);
})
