
import BasicAPIEndpoint from "./BasicAPIEndpoint";
import entity from "./enums";

/**
 * @memberof module:Data
 * @alias author
 * @type {Data.BasicAPIEndpoint}
 */

const endpoint = new BasicAPIEndpoint({"fetch-data-url":"data/author.json"}, x=>x["name"], x=>entity.author);
export default endpoint;