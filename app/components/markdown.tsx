import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import { useRef, useState, RefObject, useEffect } from "react";
import { copyToClipboard } from "../utils";

import LoadingIcon from "../icons/three-dots.svg";
<<<<<<< HEAD
=======
import React from "react";
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6

export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <pre ref={ref}>
      <span
        className="copy-code-button"
        onClick={() => {
          if (ref.current) {
            const code = ref.current.innerText;
            copyToClipboard(code);
          }
        }}
      ></span>
      {props.children}
    </pre>
  );
}

<<<<<<< HEAD
export function Markdown(
  props: {
    content: string;
    loading?: boolean;
    fontSize?: number;
    parentRef: RefObject<HTMLDivElement>;
  } & React.DOMAttributes<HTMLDivElement>,
) {
  const mdRef = useRef<HTMLDivElement>(null);

  const parent = props.parentRef.current;
  const md = mdRef.current;
  const rendered = useRef(true); // disable lazy loading for bad ux
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // to triggr rerender
    setCounter(counter + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  const inView =
    rendered.current ||
    (() => {
      if (parent && md) {
        const parentBounds = parent.getBoundingClientRect();
        const mdBounds = md.getBoundingClientRect();
        const isInRange = (x: number) =>
          x <= parentBounds.bottom && x >= parentBounds.top;
        const inView = isInRange(mdBounds.top) || isInRange(mdBounds.bottom);

        if (inView) {
          rendered.current = true;
        }

        return inView;
      }
    })();

  const shouldLoading = props.loading || !inView;

  return (
    <div
      className="markdown-body"
      style={{ fontSize: `${props.fontSize ?? 14}px` }}
      ref={mdRef}
      onContextMenu={props.onContextMenu}
      onDoubleClickCapture={props.onDoubleClickCapture}
=======
function _MarkDownContent(props: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[
        RehypeKatex,
        [
          RehypeHighlight,
          {
            detect: false,
            ignoreMissing: true,
          },
        ],
      ]}
      components={{
        pre: PreCode,
        a: (aProps) => {
          const href = aProps.href || "";
          const isInternal = /^\/#/i.test(href);
          const target = isInternal ? "_self" : aProps.target ?? "_blank";
          return <a {...aProps} target={target} />;
        },
      }}
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
    >
      {shouldLoading ? (
        <LoadingIcon />
      ) : (
        <ReactMarkdown
          remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
          rehypePlugins={[
            RehypeKatex,
            [
              RehypeHighlight,
              {
                detect: false,
                ignoreMissing: true,
              },
            ],
          ]}
          components={{
            pre: PreCode,
          }}
          linkTarget={"_blank"}
        >
          {props.content}
        </ReactMarkdown>
      )}
    </div>
  );
}

export const MarkdownContent = React.memo(_MarkDownContent);

export function Markdown(
  props: {
    content: string;
    loading?: boolean;
    fontSize?: number;
    parentRef: RefObject<HTMLDivElement>;
    defaultShow?: boolean;
  } & React.DOMAttributes<HTMLDivElement>,
) {
  const mdRef = useRef<HTMLDivElement>(null);
  const renderedHeight = useRef(0);
  const inView = useRef(!!props.defaultShow);

  const parent = props.parentRef.current;
  const md = mdRef.current;

  const checkInView = () => {
    if (parent && md) {
      const parentBounds = parent.getBoundingClientRect();
      const twoScreenHeight = Math.max(500, parentBounds.height * 2);
      const mdBounds = md.getBoundingClientRect();
      const isInRange = (x: number) =>
        x <= parentBounds.bottom + twoScreenHeight &&
        x >= parentBounds.top - twoScreenHeight;
      inView.current = isInRange(mdBounds.top) || isInRange(mdBounds.bottom);
    }

    if (inView.current && md) {
      renderedHeight.current = Math.max(
        renderedHeight.current,
        md.getBoundingClientRect().height,
      );
    }
  };

  checkInView();

  return (
    <div
      className="markdown-body"
      style={{
        fontSize: `${props.fontSize ?? 14}px`,
        height:
          !inView.current && renderedHeight.current > 0
            ? renderedHeight.current
            : "auto",
      }}
      ref={mdRef}
      onContextMenu={props.onContextMenu}
      onDoubleClickCapture={props.onDoubleClickCapture}
    >
      {inView.current &&
        (props.loading ? (
          <LoadingIcon />
        ) : (
          <MarkdownContent content={props.content} />
        ))}
    </div>
  );
}
