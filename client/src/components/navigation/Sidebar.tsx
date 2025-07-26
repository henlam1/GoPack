import { Link, useNavigate } from 'react-router-dom';
import privateRoutes from '../../routes/privateRoutes';
import publicRoutes from '../../routes/publicRoutes';
import { useAuth } from '../../hooks/useAuth';

// TODO: ADD ICONS FOR EACH SIDE BAR ITEM

interface Item {
  name: string;
  path: string;
  func?: () => void;
}

function SideBarItems({ items }: { items: Item[] }) {
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {items.map(({ name, path, func }) => {
        return <SideBarItem key={name} name={name} path={path} func={func} />;
      })}
    </ul>
  );
}
function SideBarItem({ name, path, func }: Item) {
  return (
    <li>
      <Link to={path} onClick={func}>
        {name}
      </Link>
    </li>
  );
}

export default function SideBar() {
  // TODO: Create sidebar items based off Figma
  const { logout } = useAuth();
  const navigate = useNavigate();
  const ItemList = [
    {
      name: 'Add Packing List',
      path: privateRoutes.packingLists.create,
    },
    {
      name: 'Home',
      path: privateRoutes.home,
    },
    {
      name: 'Upcoming',
      path: privateRoutes.packingLists.upcoming,
    },
    {
      name: 'Trash',
      path: privateRoutes.packingLists.trash,
    },
    {
      name: 'Logout',
      path: publicRoutes.home,
      func: async () => {
        await logout();
        navigate(publicRoutes.home);
      },
    },
  ];

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
