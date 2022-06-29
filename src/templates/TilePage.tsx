import { FC, memo } from "react";

import { Link } from "$/components/link";
import { Image } from "$/components/image";
import { Card } from "$/components/card";

import styled from "@emotion/styled";

const Grid = styled("ul")(() => ({
  listStyle: "none",
  display: "grid",
  padding: "0",
  margin: "0",
  gridTemplateColumns: "repeat(1, minmax(0,1fr))",
  gap: "1rem",
  "@media (min-width: 800px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (min-width: 1200px)": {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },

}));

const GridCell = styled("li")(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
}));

const GridLink = styled(Link)(() => ({
  display: "flex",
  flexDirection: "inherit",
  flexGrow: 1,
  color: "#fffc",
}));

declare namespace TilePage {
  export type Props = {
    tiles: Tile.Props[];
  }
}
export const TilePage: FC<TilePage.Props> = memo((props) => {
  return <div style={{ width: "50%", margin: "0 auto"}}>
    <Grid>
      {props.tiles.map((tile) => <Tile {...tile} />)}
    </Grid>
  </div>
});

declare namespace Tile {
  export type Props = {
    banner: string;
    href: string;
    title: string;
    description: string;
  }
}
const Tile: FC<Tile.Props> = memo(({ banner, href, title, description }) => {
  return <GridCell>
    <GridLink href={href}>
      <Card as="article" interactive>
        <Image src={banner} alt="" aspect={16 / 9} />
        <div style={{padding: "1rem"}}>
          <h2>
            {title}
          </h2>
          <div>
            {description}
          </div>
        </div>
      </Card>
    </GridLink>
  </GridCell>
});