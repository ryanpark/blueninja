import { useState, useEffect } from "react";
import Head from "next/head";
import * as prismicH from "@prismicio/helpers";
import { Article } from "../components/Articles";
import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Bounded } from "../components/Bounded";
import { Pagination } from "../components/Pagination";

const Index = ({ articles, navigation, settings, pathname }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentIndex]);

  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
      pathname={pathname}
      pagination={<Pagination articles={articles} pos="header" />}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)} 블루닌자</title>
      </Head>
      <Bounded size="widest">
        {/* <ul className="grid grid-cols-1 gap-16">
          {groupArticles[currentIndex].map((article, i) => (
            <Article key={article.id} article={article} index={i} />
          ))}
        </ul> */}
        <ul className="grid grid-cols-1 gap-16">
          {articles?.results.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </ul>

        <Pagination articles={articles} pos="footer" />
      </Bounded>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const articles = await client.getByType("article", {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: 6,
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
