function yearCounts(items) {
  var ret = {};
  items.forEach((item) => {
    if (Number(item.date) && String(item.date).length === 4) {
      if (!ret[item.date]) {
        ret[item.date] = { count: 0, label: item.date };
      }
      ret[item.date].count += 1;
    }
  });
  ret = Object.keys(ret).map((k) => ret[k]);
  return ret;
}

function countByType(items) {
  let ret = {
    publication: 0,
    footnote: 0,
    resource: 0,
    author: 0,
  };

  items.forEach((item) => {
    if (!ret[item.__type]) {
      ret[item.__type] = 0;
    }
    ret[item.__type] += 1;
  });
  return ret;
}

export { yearCounts, countByType };
