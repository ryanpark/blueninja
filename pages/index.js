import { useState, useEffect } from "react";
import Head from "next/head";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Bounded } from "../components/Bounded";
import { Heading } from "../components/Heading";
import { Pagination } from "../components/Pagination";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
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

const chunkArrayInGroups = (arr, size) => {
  const result = [];
  let temp = [];

  for (let a = 0; a < arr.length; a++) {
    temp.push(arr[a]);
    if (a % size === size - 1) {
      result.push(temp);
      temp = [];
    }
  }

  if (temp.length > 0) result.push(temp);

  return result;
};

const Article = ({ article, index }) => {
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
      <PrismicLink document={article} tabIndex="-1">
        <div className="bg-gray-100 aspect-w-4 aspect-h-3 relative">
          {prismicH.isFilled.image(featuredImage) && (
            <PrismicNextImage
              field={featuredImage}
              fill={false}
              className="object-cover"
            />
          )}
        </div>
      </PrismicLink>
      <div className="grid grid-cols-1 gap-3 md:col-span-2">
        <Heading as="h2">
          <PrismicLink document={article}>
            <PrismicText field={article.data.title} />
          </PrismicLink>
        </Heading>
        <p className="text-slate-500 font-serif italic tracking-tighter">
          {dateFormatter.format(date)}
        </p>
        {excerpt && (
          <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
            {excerpt}
          </p>
        )}
      </div>
    </li>
  );
};

const Index = ({ articles, navigation, settings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const groupArticles = chunkArrayInGroups(articles, 3);
  const updatePage = (page) => {
    setCurrentIndex(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentIndex]);

  const filledArray = Array.from({ length: groupArticles.length }, (e, i) => i);
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
      pagination={
        <Pagination
          pages={filledArray}
          updatePage={updatePage}
          currentIndex={currentIndex}
        />
      }
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)} 블루닌자</title>
      </Head>
      <Bounded size="widest">
        <ul className="grid grid-cols-1 gap-16">
          {groupArticles[currentIndex].map((article, i) => (
            <Article key={article.id} article={article} index={i} />
          ))}
        </ul>
        <Pagination
          pages={filledArray}
          updatePage={updatePage}
          currentIndex={currentIndex}
        />
      </Bounded>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const articles = await client.getAllByType("article", {
    orderings: [
      {
        field: "my.article.publishDate",
        direction: "desc",
        pageSize: 1,
        page: 1,
      },
      {
        field: "document.first_publication_date",
        direction: "desc",
        pageSize: 1,
        page: 1,
      },
    ],
    pageSize: 1,
    page: 1,
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      articles,
      navigation,
      settings,
    },
  };
}
