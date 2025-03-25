import { useForm } from "react-hook-form";
import {
  itemSchema,
  ItemFormFields,
  itemDefaults,
} from "../../models/zod/itemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItem } from "../../services/api/items";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ItemForm({ categoryId }: { categoryId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormFields>({
    defaultValues: itemDefaults,
    resolver: zodResolver(itemSchema),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
    },
  });

  async function onSubmit(data: ItemFormFields) {
    const linkedData = { ...data, category: categoryId };
    mutate(linkedData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("packed")} type="checkbox" />
      {errors.packed && (
        <div className="text-red-500">{errors.packed.message}</div>
      )}
      <input {...register("name")} type="text" placeholder="Item name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <input {...register("quantity")} type="number" />
      {errors.quantity && (
        <div className="text-red-500">{errors.quantity.message}</div>
      )}
      <button>{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
  );
}
