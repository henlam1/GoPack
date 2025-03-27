import { Link } from "react-router-dom";
import publicRoutes from "../../routes/publicRoutes";
import privateRoutes from "../../routes/privateRoutes";

export default function Navbar(){
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-ghost text-xl">GoPack!</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={publicRoutes.login}>Login</Link>
          </li>
          <li>
            <Link to={publicRoutes.register}>Register</Link>
          </li>
          <li>
            <Link to={privateRoutes.home}>Private Home</Link>
          </li>
          <li>
            <Link to={privateRoutes.packingLists.create}>Create Packing List</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// LIST ITEM WITH DROPDOWN
// <li>
//   <details>
//     <summary>Parent</summary>
//     <ul className="bg-base-100 rounded-t-none p-2">
//       <li>
//         <a>Link 1</a>
//       </li>
//       <li>
//         <a>Link 2</a>
//       </li>
//     </ul>
//   </details>
// </li>
