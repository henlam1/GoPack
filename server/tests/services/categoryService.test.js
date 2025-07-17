import CategoryService from "../../services/CategoryService";
import {
  insertMockCategory,
  insertMockCategories,
} from "../helpers/insertMockData";

describe("Category service operations", () => {
  beforeEach(async () => {
    await insertMockCategories();
  });

  it("gets all categories", async () => {
    const allCategories = await CategoryService.getCategories();
    expect(allCategories).toHaveLength(3);
  });

  it("gets category by id", async () => {
    const mockCategory = await insertMockCategory();
    const res = await CategoryService.getCategoryById(mockCategory._id);
    expect(res._id).toEqual(mockCategory._id);
  });

  it("adds a new category", async () => {
    await insertMockCategory();
    const allCategories = await CategoryService.getCategories();
    expect(allCategories).toHaveLength(4);
  });

  it("updates a category by id", async () => {
    const mockCategory = await insertMockCategory();
    const updatedCategory = await CategoryService.updateCategory(
      mockCategory._id,
      { name: "Essentials" }
    );
    expect(updatedCategory.name).toEqual("Essentials");
  });

  it("deletes a category by id", async () => {
    const mockCategory = await insertMockCategory();
    const deletedCategory = await CategoryService.deleteCategory(
      mockCategory._id
    );
    expect(deletedCategory).toBeTruthy();
    const search = await CategoryService.getCategoryById(mockCategory._id);
    expect(search).toBeFalsy();
  });
});
