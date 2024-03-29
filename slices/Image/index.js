import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "../../components/Bounded";

const Image = ({ slice }) => {
  const image = slice.primary.image;

  return (
    <Bounded as="section" size={slice.variation === "wide" ? "widest" : "base"}>
      <figure className="grid grid-cols-1 gap-4">
        {prismicH.isFilled.image(image) && (
          <div>
            <PrismicNextImage
              field={image}
              sizes="100vw"
              style={{ color: "black" }}
              className="border-1 border border-black"
            />
          </div>
        )}
        {prismicH.isFilled.richText(slice.primary.caption) && (
          <figcaption className="text-center tracking-tight  text-slate-500">
            <PrismicRichText field={slice.primary.caption} />
          </figcaption>
        )}
      </figure>
    </Bounded>
  );
};

export default Image;
