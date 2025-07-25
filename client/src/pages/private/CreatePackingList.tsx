// THIS PAGE IS RESPONSIBLE FOR THE FORM TO CREATE A PACKING LIST
// ON CREATION, REDIRECT TO THE DETAILS PAGE

import PackingListForm from "../../components/forms/PackingListForm";
import { genHexString } from "../../utils/stringHelpers";

export default function PackingListPage() {
  // TODO: Fetch actual user ids
  const userId = genHexString(24);

  return (
    <div className="flex justify-center items-center">
      <div className="card card-border bg-primary w-96 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title text-4xl font-bold mb-5 text-primary-content">
            Create Packing List
          </h2>
          <PackingListForm userId={userId} />
        </div>
      </div>
    </div>
  );
}
