import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Heading } from "../components/Heading";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const findFirstImage = (slices) => {
  const imageSlice = slices.find((slice) => slice.slice_type === "image");

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

const getExcerpt = (slices) => {
  const text = slices
    .filter((slice) => slice.slice_type === "text")
    .map((slice) => prismicH.asText(slice.primary.text))
    .join(" ");

  const excerpt = text.substring(0, 300);

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
  } else {
    return excerpt;
  }
};

export const Article = ({ article, loading }) => {
  const featuredImage =
    (prismicH.isFilled.image(article.data.featuredImage) &&
      article.data.featuredImage) ||
    findFirstImage(article.data.slices);
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  const excerpt = getExcerpt(article.data.slices);

  return (
    <li className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
      {loading ? (
        <div
          role="status"
          class="animate-pulse space-y-8 md:flex md:items-center md:space-y-0 md:space-x-8"
        >
          <div class="flex h-48 w-full items-center justify-center rounded bg-white opacity-60 dark:bg-gray-200 sm:w-96">
            <svg
              class="h-12 w-12 text-slate-500"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
        </div>
      ) : (
        <PrismicLink document={article} tabIndex="-1">
          <div className="aspect-w-4 aspect-h-3 relative border border-black">
            {prismicH.isFilled.image(featuredImage) && (
              <PrismicNextImage
                field={featuredImage}
                fill={false}
                className="object-cover"
              />
            )}
          </div>
        </PrismicLink>
      )}
      {loading ? (
        <div class="flex animate-pulse">
          <div class="ml-4 mt-2 w-full">
            <h2 class="h-4 rounded-md bg-white opacity-60 dark:bg-gray-200"></h2>

            <ul class="mt-5 space-y-3">
              <li class="h-2 w-full rounded-md bg-white opacity-60 dark:bg-gray-200"></li>
              <li class="h-2 w-full rounded-md bg-white opacity-60 dark:bg-gray-200"></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:col-span-2">
          <Heading as="h2" size="xl">
            <PrismicLink document={article}>
              <PrismicText field={article.data.title} />
            </PrismicLink>
          </Heading>
          <p className="tracking-tighter  text-slate-500 md:text-sm">
            {dateFormatter.format(date)}
          </p>
          {excerpt && (
            <p className="leading-relaxed md:text-sm md:leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>
      )}
    </li>
  );
};
