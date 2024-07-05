import BasicAPIEndpoint from "./BasicAPIEndpoint";
import publication from "./publication";
import entity from "./enums";
// import timeStampToSeconds from "./utils/timestampToSeconds";

/**
 * @class Data.FootnoteAPIEndpoint
 * @extends Data.BasicAPIEndpoint
 */
class FootnoteAPIEndpoint extends BasicAPIEndpoint {
  constructor(props) {
    super(
      props,
      (x) => publication.byId(x["publication.id"]),
      (_) => entity.footnote,
    );
    this.byPublication = this.byPublication.bind(this);
    this.byAuthor = this.byAuthor.bind(this);
    this.byResource = this.byResource.bind(this);
  }

  /**
   * Get a list of footnotes for a given publication
   * @returns {Array}
   * @param {string} publicationId
   */
  byPublication(publicationId) {
    return this.filter((x) => x["publication.id"] === publicationId);
  }

  /**
   * Get a list of footnotes for a given resource
   * @param {string} resourceId
   * @returns {Array}
   */
  byResource(resourceId) {
    return this.filter((x) => x["resource.id"] === resourceId);
  }

  /**
   * Get all of an author's footnotes
   * @param {string} authorId
   * @returns {Array}
   */
  byAuthor(authorId) {
    let ret = [];

    publication.byAuthor(authorId).forEach((x) => {
      ret = ret.concat(this.byPublication(x["id"]));
    });

    return ret;
  }

  /**
   * This is a helper method to get a URI of a footnote object.
   * This code is specific to the Fortunoff archive
   * @param {*} footnote
   */
  getFootnoteURI(footnote) {
    /*
     * example: https://fortunoff.aviaryplatform.com/c/mssa.hvt.0007/2/460
     */

    const aviary_url = "https://fortunoff.aviaryplatform.com/";

    const resourceID = footnote["resource.id"].trim();
    if (resourceID.indexOf("HVT-") < 0) {
      return aviary_url;
    }
    const mssid = "mssa.hvt." + resourceID.slice(4);

    const videoBaseURL =
      "https://fortunoff.aviaryplatform.com/c/" + mssid + "/";

    // if there's a full time stamp we can use that.
    if (!footnote["tape"]) {
      return videoBaseURL;
    }
    const tape = Number(footnote["tape"]);
    const start_time = Math.round(footnote["start_time"]); //.trim();

    if (!tape || start_time.length < 1) {
      return videoBaseURL;
    }

    // const seconds = timeStampToSeconds(start_time);

    return videoBaseURL + Math.round(tape) + "/" + start_time;
  }
}

/**
 * @memberof module:Data
 * @alias footnote
 * @type {Data.FootnoteAPIEndpoint}
 */

const endpoint = new FootnoteAPIEndpoint({
  "fetch-data-url": "data/footnote.json",
});
export default endpoint;
