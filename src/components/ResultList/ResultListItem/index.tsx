"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

import Button from "~/components/Button";
import SaveButton from "~/components/SaveButton";
import wordsConfig from "~/configs/words";
import useLocalDataStore from "~/store/local";
import { getFootnoteURI, secondsToTimestamp } from "~/utils/data";

function PillTray(props: any) {
  return (
    <div className="flex flex-wrap">
      <div className="flex max-w-full flex-wrap items-center">
        <div className="mr-0.5 text-[13px] font-light">
          {props.items.length} {props.title}
        </div>
        {props.items.slice(0, 5).map((item: any, i: number) => (
          <Link
            key={i}
            href={item.link}
            type="button"
            className="mx-1 mt-1 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border-l-[3px] bg-[#f5f5f5] px-1 text-[11px] text-[#286dc0] transition-[border,max-width] hover:text-[#00356b] group-hover:max-w-full"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HeaderLink(props: any) {
  const localData = useLocalDataStore();

  const term = props.type + "s";

  if (props.type === "footnote") {
    const f = props.item;
    const resource = localData.resources.find(
      (r) => r.id === props.item["resource.id"],
    );
    return (
      <div className="flex justify-around">
        <Link
          className="text-[#286dc0] no-underline hover:text-[#00356b]"
          href={`/resources/${resource.id}`}
          type="button"
        >
          {resource.title}{" "}
          {f.start_time ? `@${secondsToTimestamp(f.start_time)}` : null}
        </Link>
      </div>
    );
  }

  return (
    <Link
      className="text-[#286dc0] no-underline hover:text-[#00356b]"
      href={`/${term}/${props.item.id}`}
      type="button"
    >
      {props.header}
    </Link>
  );
}

function ItemHeader(props: any) {
  let label = props.type;
  if (wordsConfig.hasOwnProperty(props.type)) {
    label = (wordsConfig as any)[label].singular;
  }

  return (
    <div className="mb-1 flex items-baseline font-bold">
      <div className="mr-4 text-[10px] font-normal uppercase">[{label}]</div>
      <HeaderLink {...props} />
    </div>
  );
}

function FootnoteFooter(props: any) {
  return (
    <div>
      {props.item.text ? `"${props.item.text}"` : null}
      <div>
        <span className="font-light text-[#222]">
          {props.item.chapter ? `${props.item.chapter}, ` : null}
        </span>
        <span className="font-light text-[#222]">
          {props.item.page ? `page ${props.item.page} ` : null}
        </span>
      </div>
    </div>
  );
}

function AuthorFooter(props: any) {
  const localData = useLocalDataStore();
  const publications = localData.publications.filter((p) =>
    p["author.id"].some((a: any) => a === props.item.id),
  );
  const footnotes = localData.footnotes.filter((f) =>
    publications.some((p) => f["publication.id"] === p.id),
  );
  const resources = localData.resources.filter((r) =>
    footnotes.some((f) => f["resource.id"] === r.id),
  );

  return (
    <div>
      <PillTray
        title={publications.length === 1 ? "publication" : "publications"}
        items={publications.map((x: any) => {
          return { title: x.title, link: `/publications/${x.id}` };
        })}
      />
      <PillTray
        title={resources.length === 1 ? "testimoniy" : "testimonies" + " cited"}
        items={resources.map((x: any) => {
          return { title: x.title, link: `/resources/${x.id}` };
        })}
      />
    </div>
  );
}

function ResourceFooter(props: any) {
  const localData = useLocalDataStore();
  const footnotes = localData.footnotes
    .filter((f) => f["resource.id"] === props.item.id)
    .map((f) => f["publication.id"]);
  const publications = localData.publications.filter((p) =>
    footnotes.some((f) => f === p.id),
  );

  return (
    <div>
      <div>
        <span className="metadata light">{props.item.id}</span>
      </div>
      <div>
        <PillTray
          title={publications.length === 1 ? "publication" : "publications"}
          items={publications.map((x: any) => ({
            title: x.title,
            link: `/publications/${x.id}`,
          }))}
        />
      </div>
    </div>
  );
}

function PublicationFooter(props: any) {
  const localData = useLocalDataStore();

  const publication = props.item;
  const authorIDs = props.item["author.id"] || [];
  const authors = localData.authors.filter((a) =>
    authorIDs.some((id: string) => id === a.id),
  );
  const footnotes = localData.footnotes.filter(
    (f) => f["publication.id"] === publication.id,
  );
  const resources = localData.resources.filter((r) =>
    footnotes.some((f) => f["resource.id"] === r.id),
  );

  return (
    <>
      <div>
        {authors.map((author: any, i: number) => {
          return author.name ? (
            <Link
              key={i}
              className="font-bold text-[#222] underline hover:text-[#00356b]"
              href={`/authors/${author.id}`}
              type="button"
            >
              {author.name}
            </Link>
          ) : null;
        })}
        {publication.publisher && (
          <span className="font-light text-[#222]">
            , {publication.publisher}
          </span>
        )}
        {publication.date && (
          <span className="font-light text-[#222]">, {publication.date}</span>
        )}
      </div>
      <div>
        <PillTray
          title={
            resources.length === 1 ? "testimony" : "testimonies" + " cited"
          }
          items={resources.map((x: any) => ({
            title: x.title,
            link: `/resources/${x.id}`,
          }))}
        />
      </div>
    </>
  );
}

function Footer(props: any) {
  if (props.type === "author") {
    return <AuthorFooter {...props} />;
  }
  if (props.type === "publication") {
    return <PublicationFooter {...props} />;
  }
  if (props.type === "resource") {
    return <ResourceFooter {...props} />;
  }
  if (props.type === "footnote") {
    return <FootnoteFooter {...props} />;
  }
  return <div className="Footer"></div>;
}

export default function ResultListItem(props: any) {
  return (
    <div
      className={twMerge(
        "group relative mb-4 flex items-center overflow-hidden rounded-lg border-l-[10px] border-opacity-50 bg-white pr-4 transition-[border] hover:max-w-full hover:border-l-[20px] hover:border-opacity-100 hover:shadow-yale",
        props.type === "author" ? "border-l-[#ca6251]" : "",
        props.type === "publication" ? "border-l-[#0d99aa]" : "",
        props.type === "resource" ? "border-l-[#f9be00]" : "",
        props.type === "footnote" ? "border-l-[#f9be00]" : "",
      )}
    >
      <div className="w-full p-3.5">
        <ItemHeader {...props} />
        <Footer {...props} />
      </div>
      {props.type === "footnote" ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={getFootnoteURI(props.item)}
        >
          <Button className="m-0 bg-[#8ec8cc] px-5 hover:bg-[#ca6251]">
            View
          </Button>
        </a>
      ) : null}
      <SaveButton type={props.type} id={props.item.id} />
    </div>
  );
}
