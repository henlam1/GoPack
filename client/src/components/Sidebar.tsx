import { Link } from "react-router-dom";
import privateRoutes from "../routes/privateRoutes";

// TODO: ADD ICONS FOR EACH SIDE BAR ITEM

interface Item {
  name: string;
  path: string;
}

const ItemList = [
  {
    name: "Add Packing List",
    path: privateRoutes.createPackingLists,
  },
  {
    name: "Home",
    path: privateRoutes.home,
  },
  {
    name: "Upcoming",
    path: privateRoutes.upcomingPackingLists,
  },
  {
    name: "Trash",
    path: privateRoutes.trashedPackingLists,
  },
];

function SideBarItems({ items }: { items: Item[] }) {
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {items.map(({ name, path }) => {
        return <SideBarItem key={name} name={name} path={path} />;
      })}
    </ul>
  );
}
function SideBarItem({ name, path }: { name: string; path: string }) {
  return (
    <li>
      <Link to={path}>{name}</Link>
    </li>
  );
}

export default function SideBar() {
  // TODO: Create sidebar items based off Figma
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Sidebar content here */}
        <SideBarItems items={ItemList} />
      </div>
    </div>
  );
}
