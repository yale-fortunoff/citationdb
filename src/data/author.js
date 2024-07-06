import BasicAPIEndpoint from "./BasicAPIEndpoint";
import entity from "./enums";

/**
 * @memberof module:data
 * @alias author
 * @type {data.BasicAPIEndpoint}
 */

const endpoint = new BasicAPIEndpoint(
  { "fetch-data-url": "data/author.json" },
  (x) => x["name"],
  (x) => entity.author,
);
export default endpoint;
