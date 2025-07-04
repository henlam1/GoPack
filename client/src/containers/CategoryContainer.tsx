import { useQueries } from "@tanstack/react-query";
import Category from "../components/Category";
import { getCategoryAPI } from "../services/api/categories";

// CONTAINERS ARE RESPONSIBLE FOR MANAGING STATE AND PASSING DATA TO CHILD COMPONENTS
// CategoryContainer => Fetch Categories => Render Category(props)
// This is used in the packing list page to display categories in the accordion

// TODO: Modify cached data on API calls.
// Currently, we're invalidating queries and refetching on API calls

interface CategoryCoatinerProps {
  categoryIds: string[];
}

export default function CategoryContainer({
  categoryIds,
}: CategoryCoatinerProps) {
  const categoryQueries = categoryIds.map((categoryId) => ({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryAPI(categoryId),
  }));

  const results = useQueries({
    queries: categoryQueries,
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  if (results.pending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row gap-3 flex-wrap">      
      {results.data.map((category) => {
        return <Category key={category._id} {...category} />;
      })}
    </div>
  );
}
