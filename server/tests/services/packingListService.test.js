import PackingListService from "../../services/PackingListService";
import {
  insertMockPackingList,
  insertMockPackingLists,
} from "../helpers/insertMockData";

describe("Packing list service operations", () => {
  beforeEach(async () => {
    await insertMockPackingLists();
  });

  it("gets all packing lists", async () => {
    const allPackingLists = await PackingListService.getPackingLists();
    expect(allPackingLists).toHaveLength(3);
  });

  it("gets packing list by id", async () => {
    const mockPackingList = await insertMockPackingList();
    const res = await PackingListService.getPackingListById(
      mockPackingList._id
    );
    expect(res._id).toEqual(mockPackingList._id);
  });

  it("adds a new packing list", async () => {
    await insertMockPackingList();
    const allPackingLists = await PackingListService.getPackingLists();
    expect(allPackingLists).toHaveLength(4);
  });

  it("updates a packing list by id", async () => {
    const mockPackingList = await insertMockPackingList();
    const updatedPackingList = await PackingListService.updatePackingList(
      mockPackingList._id,
      { name: "Europe Trip" }
    );
    expect(updatedPackingList.name).toEqual("Europe Trip");
  });

  it("deletes a packing list by id", async () => {
    const mockPackingList = await insertMockPackingList();
    const deletedPackingList = await PackingListService.deletePackingList(
      mockPackingList._id
    );
    expect(deletedPackingList).toBeTruthy();
    const search = await PackingListService.getPackingListById(
      mockPackingList._id
    );
    expect(search).toBeFalsy();
  });
});
