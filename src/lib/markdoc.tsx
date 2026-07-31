import Markdoc from "@markdoc/markdoc";
import React from "react";

export function renderMarkdocNode(node: any): React.ReactNode {
  const renderable = Markdoc.transform(node, {});
  return Markdoc.renderers.react(renderable, React);
}
