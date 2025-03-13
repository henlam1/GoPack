import PackingListContainer from "../../containers/PackingListContainer";

export default function PackingListPage() {
  // const examplePackingList = {};
  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      PACKING LIST PAGE
      <button onClick={() => handleSubmit}>Create Packing List</button>
      <PackingListContainer />
    </div>
  );
}
