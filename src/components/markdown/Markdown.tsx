import { VFC, Fragment, createElement, useMemo, createContext, FC, useContext } from "react";

import { unified } from "unified";
import type { Root } from "hast";
import rehypeReact from "rehype-react";

declare namespace Markdown {
  export type Props = { 
    readonly ast: Root;
  }
}
export const Markdown: VFC<Markdown.Props> = ({ ast }) => {
  const components = useContext(componentContext);
  return useMemo(() => {
    return unified()
      .use(rehypeReact, {
        Fragment,
        createElement,
        components,
      })
      .stringify(ast);

  }, [ast, components]);
}

const componentContext = createContext({});

declare namespace MarkdownComponents {
  export type Props = {
    readonly components: { [key:string]: unknown };

  }
}
export const MarkdownComponents: FC<MarkdownComponents.Props> = ({ children, components }) => {

  const parentComponents = useContext(componentContext);
  const compoundComponents = useMemo(() => {
    return { ...parentComponents, ...components };
  }, [components, parentComponents]);
  return <componentContext.Provider value={compoundComponents}>
    {children}
  </componentContext.Provider>
}