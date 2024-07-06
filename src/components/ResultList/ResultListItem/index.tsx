import React from "react";
import pluralize from "pluralize";
import Link from "next/link";

import data from "~/data";
import entity from "~/data/enums";
import wordsConfig from "~/configs/words";

import Button from "~/components/Button";

import "../main.scss";

function PillTray(props: any) {
  return (
    <div className={`pill-tray-wrapper ${props.title}`}>
      <div className="pill-tray">
        <div className={`pill-tray-title`}>
          {props.items.length} {props.title}
        </div>

        {props.items.slice(0, 5).map((item: any, i: number) => {
          return (
            <div key={i} className="pill">
              <Link href={item.link}>{item.title}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeaderLink(props: any) {
  const term = props.type + "s";

  if (props.type === entity.footnote) {
    const f = props.item;
    const resource = data.resource.byId(props.item["resource.id"]);
    return (
      <div className="HeaderLink">
        <Link href={`/resources/${resource.id}`}>
          {resource.title}{" "}
          {f["start_time"]
            ? `@${data.utils.secondsToTimestamp(f["start_time"])}`
            : null}
        </Link>
      </div>
    );
  }

  return <Link href={`/${term}/${props.item.id}`}>{props.header}</Link>;
}

function ItemHeader(props: any) {
  let label = props.type;
  if (wordsConfig.hasOwnProperty(props.type)) {
    label = wordsConfig[label].singular;
  }

  return (
    <div className="ItemHeader">
      <div className="badge result-type">[{label}]</div>{" "}
      <HeaderLink {...props}></HeaderLink>
    </div>
  );
}

function FootnoteFooter(props: any) {
  return (
    <div>
      {props.item.text ? `"${props.item.text}"` : null}
      <div>
        <span className="metadata light">
          {props.item.chapter ? `${props.item.chapter}, ` : null}
        </span>
        <span className="metadata light">
          {props.item.page ? `page ${props.item.page} ` : null}
        </span>
      </div>
    </div>
  );
}

function AuthorFooter(props: any) {
  const publications = data.publication.byAuthor(props.item.id);
  const resources = data.resource.citedByAuthor(props.item.id);
  return (
    <div>
      <div>
        <PillTray
          title={pluralize("publications", publications.length)}
          items={publications.map((x: any) => {
            return { title: x.title, link: `/publications/${x.id}` };
          })}
        />
      </div>
      <div>
        <PillTray
          title={
            pluralize(wordsConfig.resource.singular, resources.length) +
            " cited"
          }
          items={resources.map((x: any) => {
            return { title: x.title, link: `/resources/${x.id}` };
          })}
        />
      </div>
    </div>
  );
}

function ResourceFooter(props: any) {
  const footnotes = data.footnote.byResource(props.item.id);
  const publications = data.publication.inFootnotes(footnotes);
  return (
    <div>
      <div>
        <span className="metadata light">{props.item.id}</span>
      </div>
      <div>
        <PillTray
          title={pluralize("publication", publications.length)}
          items={publications.map((x: any) => {
            return { title: x.title, link: `/publications/${x.id}` };
          })}
        />
      </div>
    </div>
  );
}

function PublicationFooter(props: any) {
  const publication = props.item;
  const authorIDs = props.item["author.id"] || [];
  const authors = authorIDs.map((authorID: any) => {
    let ret = data.author.byId(authorID) || {};
    return ret;
  });

  const resources = data.resource.byPublication(props.item.id);

  return (
    <div>
      <div>
        {authors.map((author: any, i: number) => {
          return author.name ? (
            <span key={i} className="metadata">
              <Link href={`/authors/${author.id}`}>{author.name}</Link>
            </span>
          ) : null;
        })}
        {publication.publisher ? (
          <span className="metadata light">, {publication.publisher}</span>
        ) : null}
        {publication.date ? (
          <span className="metadata light">, {publication.date}</span>
        ) : null}
      </div>
      <div>
        <PillTray
          title={
            pluralize(wordsConfig.resource.singular, resources.length) +
            " cited"
          }
          items={resources.map((x: any) => {
            return { title: x.title, link: `/resources/${x.id}` };
          })}
        />
      </div>
    </div>
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
    <div className={`ResultListItem ${props.type}`}>
      <div className="content-area">
        <header>
          <ItemHeader {...props} />
        </header>
        <footer>
          <Footer {...props} />
        </footer>
      </div>
      {props.type === "footnote" ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={data.footnote.getFootnoteURI(props.item)}
        >
          <Button>View</Button>
        </a>
      ) : null}
      {/* {<SaveButton type={props.type} id={props.item.id} />} */}
    </div>
  );
}
