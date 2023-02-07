export const Pagination = ({ pages, updatePage, currentIndex }) => {
  return (
    <ul className="flex gap-x-5">
      <li class="text-slate-800 font-semibold tracking-tight">Works</li>
      {pages.map((array, i) => (
        <li key={array} className="text-slate-800 font-semibold tracking-tight">
          <a
            onClick={() => updatePage(i)}
            key={array}
            className={`cursor-pointer hover:text-textBlue hover:underline ${
              i === currentIndex && "text-textBlue underline"
            }`}
          >
            {array + 1}
          </a>
        </li>
      ))}
    </ul>
  );
};
