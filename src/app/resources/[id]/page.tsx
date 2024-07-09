"use client"; // debug

import Link from "next/link";
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
        <div className="m-5 md:mx-2.5 md:flex-[2_1]">
          <h1 className="font-yalenewroman text-2xl">{resource.title}</h1>
          <div className="mt-3 font-bold text-[#222]">{resource.id}</div>

          <div className="view-button-container">
            <Link
              className="flex h-[30px] w-fit items-center justify-center rounded-lg bg-[#0d99aa] px-2.5 text-sm font-bold text-white hover:shadow-yale"
              href={data.utils.getResourceLink(resource)}
              type="button"
            >
              View
            </Link>
          </div>

          <div className="my-4">
            <p>
              This testimony has been cited{" "}
              <span className="font-bold">
                {footnotes.length} {footnotes.length === 1 ? "time" : "times"}
              </span>{" "}
              in the{" "}
              <span className="font-bold">
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
