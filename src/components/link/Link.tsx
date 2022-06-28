import type { FC } from "react";
import NextLink, { LinkProps } from "next/link";
import styled from "@emotion/styled";

// Technically not necessarily external, but specifying 
// a protocol is not required for internal links.
const isExternal = /^http/;

const A = styled("a")({
  textDecoration: "none",
  // TODO: retrieve styling from the theme.
  color: "darkturquoise",
  "&:hover": {
    color: "teal",
  }
});

/**
 * Uniform link component for linking to both internal
 * as external links. 
 */
export const Link: FC<LinkProps & { className?: string }> = (props) => {
  const { children, href, className, ...link } = props;

  if (typeof href === "string" && isExternal.test(href)) {
    return <A className={className} href={href}>{children}</A>
  }
  return <NextLink {...link} href={href} passHref>
    <A className={className}>
      {children}
    </A>
  </NextLink>
}