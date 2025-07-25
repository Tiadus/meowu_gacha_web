import Button from "../UI/Accessibility/Button";

type BannerActionProp = {
    initiate_pull: (pull_amount: number) => void;
    reset_session: () => void;
}

const BannerAction: React.FC<BannerActionProp> = ({initiate_pull, reset_session}) => {
    return (
        <div className='w-full h-full flex flex-row gap-7'>
            <Button type="PULL" functionValue={1} title="x1" color="black" initiate_pull={initiate_pull} reset_session={reset_session}/>
            <Button type="PULL" functionValue={10} title="x10" color="blue" initiate_pull={initiate_pull} reset_session={reset_session}/>
            <Button type="RESET" functionValue={0} title="Reset" color="red" initiate_pull={initiate_pull} reset_session={reset_session}/>
        </div>
    )
}

export default BannerAction;