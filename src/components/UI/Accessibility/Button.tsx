type ButtonProp = {
    type: string,
    functionValue: number
    title: string,
    color: string,
    initiate_pull: (pull_amount: number) => void,
    reset_session: () => void
}

const themeClasses: Record<string, string> = {
  black: "border-black text-black",
  blue: "border-navy text-navy",
  red: "border-danger text-danger",
};

const Button: React.FC<ButtonProp> = ({type, functionValue, title, color, initiate_pull, reset_session}) => {
    return (
        <div role='button' 
            className={`flex-1 hover:shadow-2xl hover:animate-pulse cursor-pointer select-none border-4 border-solid ${themeClasses[color]} flex justify-center items-center rounded-lg p-4 text-3xl font-bold`} 
            onClick={() => type === 'PULL' ? initiate_pull(functionValue) : reset_session()}>
                {title}
        </div>
    )
}

export default Button;