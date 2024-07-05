import BasicAPIEndpoint from "./BasicAPIEndpoint";
// import publication from "./publication";
import footnote from "./footnote";
import uniqueArray from "./utils/uniqueArray";

/**
 * Adds conveninece functions for resources
 * @class Data.ResourceAPIEndpoint
 * @extends Data.BasicAPIEndpoint
 */
class ResourceAPIEndpoint extends BasicAPIEndpoint {
  constructor(props) {
    super(
      props,
      (x) => x["title"],
      (_) => "resource",
    );

    this.citedByAuthor = this.citedByAuthor.bind(this);
    this.inFootnotes = this.inFootnotes.bind(this);
    this.byPublication = this.byPublication.bind(this);
    this.citedByAuthor = this.citedByAuthor.bind(this);
  }

  /**
   * Get all of the resources referenced in a given collection of footnotes
   * @param {Array} footnotes
   */
  inFootnotes(footnotes) {
    return uniqueArray(
      footnotes.map((x) => {
        return this.byId(x["resource.id"]);
      }),
    );
    // const loaded = [];
    // return footnotes
    //     .map(x => {
    //         return this.byId(x["resource.id"])
    //     })
    //     .filter(x => { // x is a footnote
    //         if (!x) { return }
    //         if (loaded.indexOf(x["title"]) >= 0) {
    //             return false;
    //         }
    //         loaded.push(x["title"]);
    //         return true;
    //     })
  }

  /**
   * Return all of the resources in a given publication
   * @param {string} publicationId
   */
  byPublication(publicationId) {
    return this.inFootnotes(footnote.byPublication(publicationId));
  }

  /**
   * Return all of the resources cited by an author
   * @param {string} authorId
   */
  citedByAuthor(authorId) {
    return this.inFootnotes(footnote.byAuthor(authorId));
  }
}

const endpoint = new ResourceAPIEndpoint({
  "fetch-data-url": "data/resource.json",
});

/**
 * @memberof module:Data
 * @alias resource
 * @type {Data.ResourceAPIEndpoint}
 */
export default endpoint;
// export default new ResourceAPIEndpoint(require("./json/resource.json"));
