import Link from "next/link";

import uniqueArray from "~/data/utils/uniqueArray";
import BigNumber from "~/components/BigNumber";
import ResultList from "~/components/ResultList";
import TopWrapper from "~/components/TopWrapper";
import data from "~/data";

export default function PublicationsPage(props: any) {
  const publicationsId = props.params.id;

  const item = data.publication.byId(publicationsId);
  const authors = item["author.id"]?.map((authorID: any) =>
    data.author.byId(authorID),
  );
  const footnotes = data.footnote.byPublication(publicationsId);

  const footnoteCount = footnotes.length,
    resourceCount = uniqueArray(
      data.resource.inFootnotes(footnotes).map((x: any) => x.id),
    ).length;

  return (
    <>
      <TopWrapper id={publicationsId} saveType="publication">
        <div className="m-5 md:mx-2.5">
          <h1 className="font-yalenewroman text-2xl">{item.title}</h1>
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
              {item.publisher ? `${item.publisher}` : null}
            </span>

            <span className="metadata light">
              {item.date ? `, ${item.date}` : null}
            </span>
          </div>
          <div className="metadata light">
            {item.uri ? (
              <a rel="noopener noreferrer" target="_blank" href={item.uri}>
                Publication page
              </a>
            ) : null}
          </div>

          <div className="my-4">
            <p>
              This publication cites{" "}
              <span className="font-bold">
                {resourceCount}{" "}
                {resourceCount === 1 ? "testimony" : "testimonies"}
              </span>{" "}
              in the{" "}
              <span className="font-bold">
                {footnoteCount} {footnoteCount === 1 ? "citation" : "citations"}
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
              value={footnoteCount}
            />
            <BigNumber
              className="border-[#f9be00]"
              label={resourceCount === 1 ? "testimony" : "testimonies"}
              value={resourceCount}
            />
          </div>
        </div>
      </TopWrapper>{" "}
      <section className="column-wrapper">
        <ResultList items={footnotes}></ResultList>
      </section>
    </>
  );
}
