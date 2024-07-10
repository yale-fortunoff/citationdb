"use client";

import Link from "next/link";

import BigNumber from "~/components/BigNumber";
import PublicationHistogram from "~/components/PublicationHistogram";
import ResultList from "~/components/ResultList";
import ResultListWrapper from "~/components/ResultListWrapper";
import TopWrapper from "~/components/TopWrapper";
import useLocalDataStore from "~/store";
import { getResourceLink } from "~/utils/data";

export default function ResourcesPage(props: any) {
  const localData = useLocalDataStore();

  const resourcesId = props.params.id;

  const resource = localData.resources.find((r) => r.id === resourcesId);

  if (!resource) {
    return;
  }

  const footnotes = localData.footnotes.filter(
    (f) => f["resource.id"] === resourcesId,
  );
  const publications = localData.publications.filter((p) =>
    footnotes.some((f) => f["publication.id"] === p.id),
  );

  console.log("OAWDKOAWDKO", publications);

  return (
    <div className="ResourcePage">
      <TopWrapper id={resourcesId} saveType="resource">
        <div className="m-5 md:mx-2.5 md:flex-[2_1]">
          <h1 className="font-yalenewroman text-2xl">{resource.title}</h1>
          <div className="mt-3 font-bold text-[#222]">{resource.id}</div>

          <div className="view-button-container">
            <Link
              className="flex h-[30px] w-fit items-center justify-center rounded-lg bg-[#0d99aa] px-2.5 text-sm font-bold text-white hover:shadow-yale"
              href={getResourceLink(resource)}
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
          <div className="mt-2 flex justify-end">
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

      <ResultListWrapper>
        <ResultList items={publications} />
      </ResultListWrapper>
    </div>
  );
}
