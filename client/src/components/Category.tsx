import { useQueryClient, useMutation } from "@tanstack/react-query";
import ItemContainer from "../containers/ItemContainer";
import ICategory from "../models/CategoryModel";
import { deleteCategoryAPI } from "../services/api/categories";
import ItemForm from "./forms/ItemForm";

export default function Category({ _id, name, items, packingList }: ICategory) {
  console.log("Category: ", name, items, packingList);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCategoryAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["packingList", packingList],
      });
    },
  });

  function handleDelete() {
    mutate(_id);
  }

  return (
    <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
      <input type="checkbox" />
      <div className="collapse-title font-semibold">{name}</div>
      <div className="collapse-content text-sm">
        <ItemContainer itemIds={items as string[]} />
        <h1>Item Form</h1>
        <ItemForm categoryId={_id} />
        <button
          className="btn btn-soft btn-secondary btn-sm"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
