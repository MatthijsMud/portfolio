import { VFC } from "react";
import NextImage, { ImageProps, ImageLoader } from "next/image";
import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";

const Aspect = styled("div", {
  shouldForwardProp: name => name !== "ratio" && isPropValid(name)
})<{ ratio?: number | undefined }>(({ ratio = 1 }) => {
  return {
    // When listing ratios (i.e. 19:10), the width usually
    // comes first. Dividing 1 by whatever allows for specifying 
    // the ratio by writing `width / height`.
    paddingTop: `${100/ratio}%`,
    position: "relative",
    "& img": {
      objectFit: "cover",
      objectPosition: "50% 50%",
    },
  }
});

const loader: ImageLoader = ({ src, config }) => {
  // Paths relative to the "root" of the domain need
  // to include the basepath if not hosted at the root.
  // It assumes `images.path` has been set to the appropriate
  // value in `next.config.js`.
  if (/^\//.test(src)) {
    return `${config.path}/${src}`;
  }
  return src;
}

declare namespace Image {
  export type Props = ImageProps & {
    /**
     * Aspect ratio between the width and height used to layout the image.
     * 
     * Specify the ratio by dividing the width by the height.
     * ```ts
     * <Image aspect={width / height} />
     * ```
     */
    aspect?: number | undefined;
  }
}
/**
 * Renders the specified image over the available width at the specified
 * aspect ratio. Images with a different aspect ratio are cropped.
 * 
 * 
 */
export const Image: VFC<Image.Props> = (props) => {
  const { aspect, ...rest } = props;
  // TODO: Consider using image's aspect when none is provided.
  // This could however lead to undesirable layout shifts.
  return <Aspect ratio={aspect}>
    <NextImage loader={loader} {...rest} layout="fill" />
  </Aspect>
}