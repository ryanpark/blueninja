import Link from "next/link";

export const Pagination = ({ articles, pos }) => {
  if (!articles) return <div>pagination</div>;
  const { page, total_pages } = articles;
  return (
    <ul className={`${pos === "footer" && "py-12"} flex gap-x-5`}>
      <li class="text-slate-800 font-semibold tracking-tight">Works</li>
      {Array(total_pages)
        .fill("pages")
        .map((array, index) => (
          <li
            key={array}
            className="text-slate-800 font-semibold tracking-tight"
          >
            <Link
              onClick={() => "/"}
              href={`/work2?pageNumber=${index + 1}`}
              key={array}
              className={`cursor-pointer hover:text-textBlue hover:underline ${
                index + 1 === page && "text-textBlue underline"
              }`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
    </ul>
  );
};
