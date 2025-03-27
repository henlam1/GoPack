// THIS PAGE IS RESPONSIBLE FOR THE FORM TO CREATE A PACKING LIST
// ON CREATION, REDIRECT TO THE DETAILS PAGE

import PackingListForm from "../../components/forms/PackingListForm";
import { genHexString } from "../../utils/stringHelpers";

export default function PackingListPage() {
  // TODO: Fetch actual user ids
  const userId = genHexString(24);
  
  return (
    <div>
      CREATE PACKING LIST
      <h1>Packing List Form</h1>
      <PackingListForm userId={userId}/>
    </div>
  );
}
