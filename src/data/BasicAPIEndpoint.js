import dictToArray from "./dictToArray";

export default class BasicAPIEndpoint {
  /**
   * @constructor
   * @alias data.BasicAPIEndpoint
   * @param {Object} obj
   */
  constructor(
    obj,
    headerKey = (x) => {},
    typeKey = (x) => {},
    fireWhenLoaded = () => {},
  ) {
    this.loaded = false;

    this.headerKey = headerKey.bind(this);
    this.typeKey = typeKey.bind(this);

    this.resourceDictionary = obj;
    this.resourceArray = dictToArray(obj);

    this.all = this.all.bind(this);
    this.dictionary = this.dictionary.bind(this);
    this.byId = this.byId.bind(this);
    this.filter = this.filter.bind(this);
    this.find = this.find.bind(this);
    this.handleData = this.handleData.bind(this);
    this.fireWhenLoaded = fireWhenLoaded.bind(this);
    this.hasLoaded = this.hasLoaded.bind(this);

    // If we're given a URL, load that, otherwise
    // use the object directly as the API content
    if (obj.hasOwnProperty("fetch-data-url")) {
      // load data asynchronously and ignore the rest
      let url = obj["fetch-data-url"];
      if (!url.startsWith("http") && typeof window !== "undefined") {
        url = `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
      }
      fetch(url)
        .then((res) => res.json())
        .then(
          (obj) => this.handleData(obj),
          (error) => {
            console.error("Error loading data " + url, error);
          },
        );
    } else {
      this.handleData(obj);
    }
  }

  /**
   * Determine if the data has loaded
   */
  hasLoaded() {
    return this.loaded;
  }

  /**
   * Handle the data object when it arrives
   * @param {Object} obj
   */
  handleData(obj) {
    // insert a a
    Object.keys(obj).forEach((k) => {
      let o = obj[k];
      o["id"] = k;
      o["__header"] = this.headerKey(o);
      o["__type"] = this.typeKey(o);
    });

    this.resourceDictionary = obj;
    this.resourceArray = dictToArray(obj);
    this.loaded = true;
    this.fireWhenLoaded();
  }

  /**
   * Get a dictionary index of all items
   * @memberof data.BasicAPIEndpoint
   */
  dictionary() {
    return this.resourceDictionary;
  }

  /**
   * Get an array of all items
   * @memberof data.BasicAPIEndpoint
   */
  all() {
    return this.resourceArray;
  }

  /**
   * Find one item by id or undefined
   * @param {string} id
   * @memberof data.BasicAPIEndpoint
   */
  byId(id, keyField = "id") {
    let ret = Object.assign({}, this.dictionary()[id]);

    // insert the id
    ret[keyField] = id;
    return ret;
  }

  /**
   * Get an array of all items i for which f(i) returns True
   * @param {function} f
   * @memberof data.BasicAPIEndpoint
   */
  filter(f) {
    return this.all().filter(f);
  }

  /**
   * Get item that matches f(i) if only one item matches f(i). Fail if multiple items return true
   * @param {function} f
   * @memberof data.BasicAPIEndpoint
   */
  find(f) {
    const matches = this.filter(f);

    if (matches.length === 1) {
      return matches[0];
    }

    if (matches.length < 1) {
      throw new Error("Error: More than one result found matching criteria");
    } else if (matches.length > 0) {
      throw new Error("Error: No results found");
    }
  }
}
