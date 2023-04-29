import { useState, useEffect } from "react";
import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";
import { Article } from "../components/Articles";
import { Pagination } from "../components/Pagination";

const Page = ({ articles, page, navigation, settings, pathname }) => {
  const isContactPage = page?.uid === "contact-me";
  return (
    <Layout
      navigation={navigation}
      settings={settings}
      pathname={pathname}
      pagination={<Pagination articles={articles} pos="header" />}
    >
      <Head>
        <title>
          {prismicH.asText(page.data.title)} |{" "}
          {prismicH.asText(settings.data.name)}
        </title>
      </Head>

      <SliceZone slices={page.data.slices} components={components} />

      <div class=" px-4 pt-8 md:px-6 md:pt-10 lg:py-10">
        <div class="mx-auto w-full max-w-6xl">
          {!isContactPage && (
            <ul className="grid grid-cols-1 gap-16">
              {articles?.results.map((article) => (
                <Article key={article.id} article={article} />
              ))}
            </ul>
          )}
          <Pagination articles={articles} pos="footer" />
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export async function getServerSideProps({ params, previewData, query }) {
  const client = createClient({ previewData });
  const { pageNumber } = query;
  const page = await client.getByUID("page", params.uid);

  const articles = await client.getByType("article", {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: 6,
    page: pageNumber || 1,
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      settings,
      articles,
    },
  };
}
