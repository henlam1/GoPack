import { useNavigate } from "react-router-dom";
import privateRoutes from "../routes/privateRoutes";

interface CardProps {
  _id: string,
  name: string;
}

export default function PackingListCard({ _id, name }: CardProps) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(privateRoutes.packingLists.details(_id));
  }
  console.log("Packing List: ", _id, name)
  return (
    <div className="card bg-base-100 w-96 shadow-sm" onClick={handleClick}>
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>blah blah, we can put some random default image on top</p>
      </div>
    </div>
  );
}
