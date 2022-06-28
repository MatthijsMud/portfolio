import { FC } from "react";
import styled from "@emotion/styled";

export const Card = styled("div")<{ interactive?: boolean }>(({ interactive }) => {
  return {
    boxShadow: "0 1px 4px #0006",
    borderRadius: "2px",
    overflow: "hidden",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    transition: "box-shadow ease-in-out 0.2s, background-color ease-in-out 0.2s",
    ...(interactive && { 
        "&:hover": {
        backgroundColor: "#fff1",
        boxShadow: "0 2px 16px #0003",
      },
    }),
  }
});