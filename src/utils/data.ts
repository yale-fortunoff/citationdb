// @ts-nocheck

export function getRecordingYear(record: any) {
  // returns only the first recording year
  return (record.recording_dates || [])
    .filter((a: any) => a)
    .map((a: any) => Number(a.slice(0, 4)))
    .sort()[0];
}

export function yearCounts(items) {
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

export function countByType(items) {
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

export function secondsToTimestamp(seconds) {
  const h = Math.floor(seconds / (60 * 60));

  let remaining = seconds - h * 60 * 60;

  const m = Math.floor(remaining / 60);

  remaining = remaining - 60 * m;

  const s = Math.floor(remaining);

  const seg = (x) => String(x).padStart(2, "0");

  return `${seg(h)}:${seg(m)}:${seg(s)}`;
}

export function getResourceLink(resource) {
  /*
   * example: https://fortunoff.aviaryplatform.com/c/mssa.hvt.0007/2/460
   */

  // drop the "HVT-" part
  const num = String(resource.id.slice(4)).padStart(4, "0");

  return `https://fortunoff.aviaryplatform.com/c/mssa.hvt.${num}`;
}

export function dictToArray(obj, keyField = "id") {
  return Object.keys(obj).map((key) => {
    let ret = {
      ...obj[key],
    };

    ret[keyField] = key;

    return ret;
  });
}

export function getFootnoteURI(footnote) {
  /*
   * example: https://fortunoff.aviaryplatform.com/c/mssa.hvt.0007/2/460
   */

  const aviary_url = "https://fortunoff.aviaryplatform.com/";

  const resourceID = footnote["resource.id"].trim();
  if (resourceID.indexOf("HVT-") < 0) {
    return aviary_url;
  }
  const mssid = "mssa.hvt." + resourceID.slice(4);

  const videoBaseURL = "https://fortunoff.aviaryplatform.com/c/" + mssid + "/";

  // if there's a full time stamp we can use that.
  if (!footnote["tape"]) {
    return videoBaseURL;
  }
  const tape = Number(footnote["tape"]);
  const start_time = Math.round(footnote["start_time"]); //.trim();

  if (!tape || start_time.length < 1) {
    return videoBaseURL;
  }

  return videoBaseURL + Math.round(tape) + "/" + start_time;
}
