const ArrowDownInCircle: React.FC = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="#878787"
            className="size-8 animate-bounce">
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                />
        </svg>
    )
}

export default ArrowDownInCircle;