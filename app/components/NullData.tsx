interface NullDataProps{
    title: string;
}
const NullData: React.FC<NullDataProps> = ({title}) => {
    return (
        <div className="text-red-400 w-full h-[50vh] flex items-center justify-center text-xl md:text-4xl">
            <p>{title}</p>
        </div>
    )
}
export default NullData;