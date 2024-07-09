"use client"; // debug

import BigNumber from "~/components/BigNumber";
import Button from "~/components/Button";
import PublicationHistogram from "~/components/PublicationHistogram";
import ResultList from "~/components/ResultList";
import TopWrapper from "~/components/TopWrapper";
import data from "~/data";

export default function ResourcesPage(props: any) {
  const resourcesId = props.params.id;

  const resource = data.resource.dictionary()[resourcesId];

  if (!resource) {
    return;
  }

  const publications = data.publication.byResource(resourcesId);
  const footnotes = data.footnote.byResource(resourcesId);

  return (
    <div className="ResourcePage">
      <TopWrapper id={resourcesId} saveType="resource">
        <div className="left">
          <h1 className="title">{resource.title}</h1>
          <div className="chunk metadata">{resource.id}</div>

          <div className="view-button-container">
            <a href={data.utils.getResourceLink(resource)}>
              {" "}
              <Button>View</Button>
            </a>
          </div>

          <div className="summary">
            <p>
              This testimony has been cited{" "}
              <span className="stat">
                {footnotes.length} {footnotes.length === 1 ? "time" : "times"}
              </span>{" "}
              in the{" "}
              <span className="stat">
                {publications.length}{" "}
                {publications.length === 1 ? "publication" : "publications"}
              </span>{" "}
              listed below.
            </p>
          </div>
        </div>
        <div className="md:max-w-[350px]">
          <PublicationHistogram items={publications} />
          <div className="flex-center md:flex-end flex">
            <BigNumber
              className="border-[#f48734]"
              label={footnotes.length === 1 ? "citation" : "citations"}
              value={footnotes.length}
            />
            <BigNumber
              className="border-[#0d99aa]"
              label={publications.length === 1 ? "publication" : "publications"}
              value={publications.length}
            />
          </div>
        </div>
      </TopWrapper>

      <section className="column-wrapper">
        <ResultList items={publications} />
      </section>
    </div>
  );
}
