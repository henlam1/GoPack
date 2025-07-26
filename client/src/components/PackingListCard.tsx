import { useNavigate } from 'react-router-dom';
import privateRoutes from '../routes/privateRoutes';
import { deletePackingListAPI } from '../services/api/packingLists';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CardProps {
  _id: string;
  name: string;
}

export default function PackingListCard({ _id, name }: CardProps) {
  console.log('Packing List: ', _id, name);
  const navigate = useNavigate();

  function handleClick() {
    navigate(privateRoutes.packingLists.details(_id));
  }

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deletePackingListAPI,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['packingLists'],
      });
    },
  });

  function handleDelete() {
    mutate(_id);
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm basis-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>blah blah, we can put some random default image on top</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm" onClick={handleClick}>
            View
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
