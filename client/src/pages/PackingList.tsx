import { useParams } from 'react-router';

export default function PackingList() {
    const allPackingLists = [
        {
            id: 0,
            name: "Coppenhagen in Winter"
        },
        {
            id: 1,
            name: "Paris In Summer"
        },
        {
            id: 2,
            name: "London In Fall"
        },
    ]

    const {id} = useParams();
    console.log(id);

    return (
        <div className="prose mx-auto">
            <h1>{allPackingLists[id].name}</h1>
        </div>
    );
}