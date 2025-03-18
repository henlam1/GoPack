import PackingListContainer from "../../containers/PackingListContainer";

// THIS PAGE DISPLAYS PACKING LISTS IN A ROW OF CARDS (EASY NAVIGATION)
// CLICKING ON A CARD RE-DIRECTS YOU TO THE DETAILS PAGE
export default function HomePage() {
  return (
    <div>
      CLIENT HOME PAGE
      <PackingListContainer />
    </div>
  )
}