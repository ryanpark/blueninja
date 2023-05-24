import Link from "next/link";

export const Pagination = ({ articles, pos, isContactPage }) => {
  if (!articles) return <div>pagination</div>;
  const { page, total_pages } = articles;
  return (
    <ul className={`${pos === "footer" && "py-12"} flex gap-x-2`}>
      <li class="font-semibold tracking-tight text-slate-800">Works</li>
      {Array(total_pages)
        .fill("pages")
        .map((array, index) => (
          <li
            key={array}
            className="font-semibold tracking-tight text-slate-800"
          >
            <Link
              onClick={() => "/"}
              href={`/work2?pageNumber=${index + 1}`}
              key={array}
              className={`cursor-pointer px-3 hover:text-textBlue hover:underline ${
                index + 1 === page &&
                !isContactPage &&
                "text-textBlue underline"
              }`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
    </ul>
  );
};
