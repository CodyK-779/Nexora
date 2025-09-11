"use client";

import { useState } from "react";

interface Props {
  description: string;
}

const DescTextExtend = ({ description }: Props) => {
  const [extended, setExtended] = useState(false);

  return (
    <>
      <p
        className={`max-[420px]:text-sm leading-relaxed font-medium text-neutral-600 dark:text-gray-300 ${
          (!extended || description.length > 300) && "lg:line-clamp-5"
        }`}
      >
        {description}
      </p>
      {description.length > 300 && (
        <p
          className="text-sm font-medium cursor-pointer text-neutral-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          onClick={() => setExtended(!extended)}
        >
          {extended ? "Show less" : "...Show more"}
        </p>
      )}
    </>
  );
};

export default DescTextExtend;
