"use client";

import Link from "next/link";

import BigNumber from "~/components/BigNumber";
import ResultList from "~/components/ResultList";
import TopWrapper from "~/components/TopWrapper";
import ResultListWrapper from "~/components/ResultListWrapper";
import useLocalDataStore from "~/store";
import { uniqueArray } from "~/utils/array";

export default function PublicationsPage(props: any) {
  const publicationsId = props.params.id;

  const localData = useLocalDataStore();

  const publication = localData.publications.find(
    (p) => p.id === publicationsId,
  );

  const authors = localData.authors.filter((a) =>
    publication["author.id"].some((aid: string) => aid === a.id),
  );

  const footnotes = localData.footnotes.filter(
    (f) => f["publication.id"] === publicationsId,
  );

  const uniqueResources = uniqueArray(
    localData.resources.filter((r) =>
      footnotes.some((f) => f["resource.id"] === r.id),
    ),
    "id",
  );

  return (
    <>
      <TopWrapper id={publicationsId} saveType="publication">
        <div className="m-5 md:mx-2.5">
          <h1 className="font-yalenewroman text-2xl">{publication.title}</h1>
          <div className="chunk">
            {authors?.map((author: any, i: number) => (
              <span key={i} className="metadata">
                <Link href={`/authors/${author.id}`}>
                  {author.name ? `${author.name}` : null}
                </Link>
                {"; "}
              </span>
            ))}

            <span className="metadata">
              {publication.publisher ? `${publication.publisher}` : null}
            </span>

            <span className="metadata light">
              {publication.date ? `, ${publication.date}` : null}
            </span>
          </div>
          <div className="metadata light">
            {publication.uri ? (
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={publication.uri}
              >
                Publication page
              </a>
            ) : null}
          </div>

          <div className="my-4">
            <p>
              This publication cites{" "}
              <span className="font-bold">
                {uniqueResources.length}{" "}
                {uniqueResources.length === 1 ? "testimony" : "testimonies"}
              </span>{" "}
              in the{" "}
              <span className="font-bold">
                {footnotes.length}{" "}
                {footnotes.length === 1 ? "citation" : "citations"}
              </span>{" "}
              listed below.
            </p>
          </div>
        </div>
        <div className="md:max-w-[350px]">
          <div className="flex justify-center">
            <BigNumber
              className="border-[#f48734]"
              label="citations"
              value={footnotes.length}
            />
            <BigNumber
              className="border-[#f9be00]"
              label={uniqueResources.length === 1 ? "testimony" : "testimonies"}
              value={uniqueResources.length}
            />
          </div>
        </div>
      </TopWrapper>{" "}
      <ResultListWrapper>
        <ResultList items={footnotes} />
      </ResultListWrapper>
    </>
  );
}
