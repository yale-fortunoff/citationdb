/**
 * data API
 *
 * @module data
 * @exports data.author
 */
import resource from "./resource";
import footnote from "./footnote";
import publication from "./publication";
import author from "./author";
import FussyArray from "./utils/FussyArray";
import * as summarize from "./summarize";
import * as utils from "./utils";

/**
 * Search authors, publications and resources
 * @param {Object} options
 */
function search(options) {
  options = options ?? {};
  const toggles = options?.toggles ?? {
    resource: true,
    publication: true,
    author: true,
  };
  const searchTerm = options?.searchTerm ?? "";

  let results = new FussyArray();

  function searchEntity(entity, field, api) {
    if (toggles[entity] !== true) {
      return [];
    }

    return api.filter((x) => {
      const fofx = field(x);

      if (searchTerm.trim().length < 1) {
        return true;
      }
      if (!fofx) {
        return false;
      }
      const ret = fofx.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;

      if (ret) {
        //&& (added.indexOf(tmpId) < 0)){
        return true;
      }

      return false;
    });
  }

  // search for authors by name
  results.addArray(
    searchEntity("author", (x) => x["name"], author),
    (x) => "author." + x["id"],
  );

  // search for resources by title
  results.addArray(
    searchEntity("resource", (x) => x["title"], resource),
    (x) => "resource." + x["id"],
  );

  // Search for publications by author name
  results.addArray(
    searchEntity(
      "publication",
      (x) => author.byId(x["author.id"]).name,
      publication,
    ),
    (x) => "publication." + x["id"],
  );

  // search for publications by title
  results.addArray(
    searchEntity("publication", (x) => x["title"], publication),
    (x) => "publication." + x["id"],
  );

  return results;
}

export default {
  author,
  footnote,
  publication,
  resource,
  search,
  summarize,
  utils,
};
