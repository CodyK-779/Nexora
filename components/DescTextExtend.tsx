"use client";

import clsx from "clsx";
import { useState } from "react";

interface Props {
  description: string;
}

const DescTextExtend = ({ description }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate = description.length > 300;

  return (
    <div className="space-y-2">
      <p
        className={clsx(
          "max-[420px]:text-sm leading-relaxed font-medium text-neutral-600 dark:text-gray-300 transition-all duration-300",
          !expanded && shouldTruncate && "line-clamp-5"
        )}
      >
        {description}
      </p>

      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default DescTextExtend;
