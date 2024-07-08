import { useMemo } from "react";

const useStripHtml = () => {
  return useMemo(
    () => (html) => {
      if (!html) return "";
      return html.replace(/<\/?[^>]+(>|$)/g, "");
    },
    []
  );
};

export default useStripHtml;
