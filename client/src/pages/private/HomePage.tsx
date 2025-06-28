import PackingListContainer from "../../containers/PackingListContainer";

// THIS PAGE DISPLAYS PACKING LISTS IN A ROW OF CARDS (EASY NAVIGATION)
// CLICKING ON A CARD RE-DIRECTS YOU TO THE DETAILS PAGE
// TODO: IMPLEMENT USER CONTEXT FOR PACKINGLIST CONTAINER TO GET PACKINGLISTIDS
export default function HomePage() {
  return (
    <div className="m-4">
      CLIENT HOME PAGE
      <PackingListContainer />
    </div>
  )
}