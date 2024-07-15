"use client";

import BigNumber from "~/components/BigNumber";
import ResultList from "~/components/ResultList";
import TopWrapper from "~/components/TopWrapper";

import ResultListWrapper from "~/components/ResultListWrapper";
import { uniqueArray } from "~/utils/array";
import useLocalDataStore from "~/store/local";

export default function AuthorsPage(props: { params: { id: string } }) {
  const localData = useLocalDataStore();

  const authorId = props.params.id;

  const author = localData.authors.find((a) => a.id === authorId);

  if (!author) {
    return;
  }

  const publications = localData.publications.filter((p) =>
    p["author.id"].some((id: string) => id === authorId),
  );
  const footnotes = localData.footnotes.filter((f) =>
    publications.some((p) => p.id === f["publication.id"]),
  );
  const uniqueResources = uniqueArray(
    localData.resources.filter((r) =>
      footnotes.some((f) => f["resource.id"] === r.id),
    ),
    "id",
  );

  return (
    <div className="PublicationPage">
      <TopWrapper id={authorId} saveType="author">
        <div className="m-5 md:mx-2.5 md:my-0 md:flex-[2_1]">
          <div>
            <h1 className="font-yalenewroman text-2xl">{author.name}</h1>
            {author.uri?.length > 0 && (
              <a
                className="text-[#286dc0] no-underline hover:text-[#00356b]"
                href={author.uri}
              >
                Author website
              </a>
            )}
            <div className="my-4">
              <p>
                This author has made{" "}
                <span className="font-bold">
                  {footnotes.length}{" "}
                  {footnotes.length === 1 ? "citation" : "citations"}
                </span>{" "}
                to{" "}
                <span className="font-bold">
                  {uniqueResources.length}{" "}
                  {uniqueResources.length === 1 ? "testimony" : "testimonies"}
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
        </div>
        <div className="md:max-w-[350px]">
          <div className="flex justify-center md:justify-end">
            <BigNumber
              className="border-[#0d99aa]"
              label={publications.length === 1 ? "publication" : "publications"}
              value={publications.length}
            />
            <BigNumber
              className="border-[#f48734]"
              label={footnotes.length === 1 ? "citation" : "citations"}
              value={footnotes.length}
            />
            <BigNumber
              className="border-[#f9be00]"
              label={uniqueResources.length === 1 ? "testimony" : "testimonies"}
              value={uniqueResources.length}
            />
          </div>
        </div>
      </TopWrapper>
      ,
      <ResultListWrapper>
        <ResultList items={publications} />
      </ResultListWrapper>
    </div>
  );
}
