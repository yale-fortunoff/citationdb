// @ts-nocheck

import data from "../data";

// Set local or session storage;
const storage = isClient() ? localStorage : null;
let callbacks = {};

export function isClient() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

function hasStorage() {
  if (!isClient()) {
    return false;
  }
  try {
    storage.setItem("canary", Date.now());
    storage.removeItem("canary");
  } catch {
    return false;
  }
  return true;
}

function listID(type) {
  return "yale-fortunoff-cdb-" + type;
}

function getList(type) {
  if (!hasStorage()) {
    return [];
  }
  const ret = storage.getItem(listID(type));
  if (!ret) {
    return [];
  }
  try {
    return JSON.parse(ret);
  } catch {
    return [];
  }
}

function setList(type, arr) {
  if (!hasStorage()) {
    return;
  }
  storage.setItem(listID(type), JSON.stringify(arr));
  Object.keys(callbacks).forEach((k) => callbacks[k]());
}

function unsubscribe(key) {
  callbacks[key] = () => {};
}
function subscribe(key, f) {
  callbacks[key] = f;
}

function addItem(type, id) {
  let arr = getList(type);

  if (arr.indexOf(id) >= 0) {
    return;
  }

  arr.push(id);
  setList(type, arr);
}

function removeItem(type, id) {
  let arr = getList(type).filter((x) => x !== id);
  setList(type, arr);
}

const key = {
  resource: "resource",
  publication: "publication",
  author: "author",
};

function getSavedAuthors() {
  return getList(key.author).map((id) => data.author.byId(id));
}
function getSavedPublications() {
  return getList(key.publication).map((id) => data.publication.byId(id));
}
function getSavedResources() {
  return getList(key.resource).map((id) => data.resource.byId(id));
}

function saveResource(id) {
  addItem(key.resource, id);
}
function savePublication(id) {
  addItem(key.publication, id);
}
function saveAuthor(id) {
  addItem(key.author, id);
}

function removeResource(id) {
  removeItem(key.resource, id);
}
function removePublication(id) {
  removeItem(key.publication, id);
}
function removeAuthor(id) {
  removeItem(key.author, id);
}

export {
  getSavedAuthors,
  getSavedPublications,
  getSavedResources,
  saveAuthor,
  savePublication,
  saveResource,
  removeAuthor,
  removePublication,
  removeResource,
  subscribe,
  unsubscribe,
};
