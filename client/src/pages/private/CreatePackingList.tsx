// THIS PAGE IS RESPONSIBLE FOR THE FORM TO CREATE A PACKING LIST
// ON CREATION, REDIRECT TO THE DETAILS PAGE

import PackingListForm from "../../components/forms/PackingListForm";

export default function PackingListPage() {
  return (
    <div>
      CREATE PACKING LIST
      <h1>Packing List Form</h1>
      <PackingListForm />
    </div>
  );
}
