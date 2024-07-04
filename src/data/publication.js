import BasicAPIEndpoint from "./BasicAPIEndpoint";
import footnote from "./footnote";
// import resource from "./resource";
import uniqueArray from "./utils/uniqueArray";
import FussyArray from "./utils/FussyArray";

/** 
 * Adds a byAuthor search convenience method
 * @class Data.PublicationAPIEndpoint
 * @extends Data.BasicAPIEndpoint
 */
class PublicationAPIEndPoint extends BasicAPIEndpoint {

    /**
     * @constructor
     * @alias Data.PublicationAPIEndpoint
     * @param {Object} props 
     */
    constructor(props){
        super(props, x=>x["title"], _=>"publication");

        this.byAuthor = this.byAuthor.bind(this);
        this.inFootnotes = this.inFootnotes.bind(this);
        this.byResource = this.byResource.bind(this)
    }

    /**
     * Get publications by a given author
     * @param {string} authorId 
     * @returns {Array}
     * @method Data.PublicationAPIEndpoint#byAuthor
     */
    byAuthor(authorId){
        //return  this.filter(x=>x["author.id"] === authorId)

        // Refactored to support multiple authors
        return this.filter(x=>x["author.id"].indexOf(authorId) >= 0)
    }

    
    inFootnotes(footnotes){

        // let ret = new FussyArray();
        // ret.addArray(footnotes.map(x => this.byId(x["publication.id"])))

        // return ret; 

        return uniqueArray(
            footnotes.map(x => this.byId(x["publication.id"])),
            x=>x["id"]
        )
    }

    /**
     * Get publications that cite a given resource
     */
    byResource(resourceId){
        return this.inFootnotes(footnote.byResource(resourceId))

        // let ret = [];
        // footnotes.forEach(f => {
        //     if (ret.indexOf(f) >= 0){ return }
        //     ret.push(f)
        // })
        // return ret;
    }

}

const endpoint = new PublicationAPIEndPoint({"fetch-data-url":"data/publication.json"});
/**
 * @memberof module:Data
 * @alias publication
 * @type {Data.PublicationAPIEndpoint}
 */
export default endpoint;

//export default new PublicationAPIEndPoint(require("./json/publication.json"));