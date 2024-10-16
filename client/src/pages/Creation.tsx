import Navbar from "../components/Navbar";

type CreationProps = {
    onFinish: () => void;
}

export default function Creation(props: CreationProps) {
    return(
        <div className="mt-12">
            Creation Page
            <button className="btn" onClick={props.onFinish}>CLICK ME</button>
        </div>
    )
}