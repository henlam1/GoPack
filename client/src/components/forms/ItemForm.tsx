import { useForm } from "react-hook-form";
import {
  itemSchema,
  ItemFormFields,
  itemDefaults,
} from "../../models/zod/itemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useItemMutations } from "../../hooks/useItemMutations";
import { useState } from "react";

export default function ItemForm({ categoryId }: { categoryId: string }) {
  // Form submission functions
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormFields>({
    defaultValues: itemDefaults,
    resolver: zodResolver(itemSchema),
  });

  const [showForm, setShowForm] = useState(false);

  // Hooks to manage item CRUD
  const { createItem } = useItemMutations(categoryId);

  async function onSubmit(data: ItemFormFields) {
    const linkedData = { ...data, category: categoryId };
    createItem.mutate(linkedData);
    toggleShowForm();
    reset();
  }

  function toggleShowForm() {
    setShowForm(showForm => !showForm);
  }

  return (
    <>
      { showForm &&
        (<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
          <span>
            <input {...register("name")} type="text" placeholder="Item name" className="input validator" />
            {errors.name && <p className="block text-error">{errors.name.message}</p>}
          </span>

          <span>
            <input {...register("quantity")} type="number" className="input validator" min="1"/>
            {errors.quantity && <p className="block text-errort">{errors.quantity.message}</p>}
          </span>
          
          <span className="flex gap-1">
            <button className="btn btn-square btn-success text-2xl">{isSubmitting ? "..." : "+"}</button>
            <button 
              className="btn btn-square btn-neutral" 
              onClick={e => {
                reset();
                e.stopPropagation();
                toggleShowForm();
              }}
            >
              <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43"><path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"/></svg>      
            </button>
          </span>
        </form>)
      }
      { !showForm && 
        (
          <button className="btn btn-primary" onClick={toggleShowForm}>{isSubmitting ? "..." : "+ Item"}</button>
        )
      }
    </>
  );
}
