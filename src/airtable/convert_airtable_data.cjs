// @ts-nocheck

const fs = require("fs-extra");
const path = require("path");
var filetree = require("filetree.js");

const tree = filetree({
  path: path.resolve(__dirname, "../airtable/"),
  maxDepth: 4,
  exclude: ["node_modules", "bower_components"],
  all: true,
  indent: true,
});

/**************
 * ENSURE DIR *
 **************/

fs.ensureDirSync(path.resolve(__dirname, "../../public/data"));

/***********
 * AUTHORS *
 ***********/
const AuthorSource = require(path.resolve(__dirname, "./author.json"));
const authorTarget = {};

for (const obj of AuthorSource) {
  const id = obj.id ? obj.id : obj.name?.toLowerCase().replace(/\s+/g, "-");
  if (id === undefined) continue;
  authorTarget[id] = {
    name: obj.name,
    uri: obj.uri ? obj.uri : null,
  };
}

fs.writeFileSync(
  path.resolve(__dirname, "../../public/data/author.json"),
  JSON.stringify(authorTarget, null, 2),
);

/*************
 * FOOTNOTES *
 *************/
const FootnoteSource = require(path.resolve(__dirname, "./footnote.json"));
const footnoteTarget = {};

FootnoteSource.forEach((obj, index) => {
  if (!obj["resource.id"]) {
    return console.log(`No resource id for ${index}`, obj);
  }

  footnoteTarget[`e6797972-${index}`] = {
    chapter: null,
    end_time: null,
    number: index + 1,
    page: null,
    start_time: null,
    text: null,
    "publication.id": obj["publication.id"][0],
    "resource.id": obj["resource.id"][0],
    uri: obj.uri,
  };
});

fs.writeFileSync(
  path.resolve(__dirname, "../../public/data/footnote.json"),
  JSON.stringify(footnoteTarget, null, 2),
);

/*************
 * RESOURCES *
 *************/
const resourceSource = require(path.resolve(__dirname, "./resource.json"));
const resourceTarget = {};

resourceSource.forEach((item) => {
  resourceTarget[item.id] = {
    title: item.title,
  };
});

fs.writeFileSync(
  path.resolve(__dirname, "../../public/data/resource.json"),
  JSON.stringify(resourceTarget, null, 2),
);

/****************
 * PUBLICATIONS *
 ****************/
const publicationSource = require(
  path.resolve(__dirname, "./publication.json"),
);
const publicationTarget = {};

for (const item of publicationSource) {
  const id = item.id;
  const authorId = item["author.id"] ? item["author.id"] : [];
  const date = item.date || null;
  const uri = item.uri || null;
  const publisher = item.publisher || null;
  const type = item.type ? item.type[0].split(" ")[0].toLowerCase() : null;
  const title = item.title;

  publicationTarget[id] = {
    "author.id": authorId,
    date,
    uri,
    publisher,
    type,
    title,
  };
}

fs.writeFileSync(
  path.resolve(__dirname, "../../public/data/publication.json"),
  JSON.stringify(publicationTarget, null, 2),
);
