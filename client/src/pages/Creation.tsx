type CreationProps = {
    onFinish: () => void;
}

export default function Creation(props: CreationProps) {
    return(
        <div>
            Creation Page
            <button className="btn" onClick={props.onFinish}>CLICK ME</button>
        </div>
    )
}