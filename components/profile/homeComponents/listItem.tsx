import { FaRegTrashAlt } from "react-icons/fa";

const ListItem = () => {
    return (
        <li className="w-full sm:w-3/5 max-w-3xl flex items-center justify-between border border-blue-500 rounded-xl p-2.5 bg-white">
            <div className="text-blue-950 w-1/4 sm:min-w-24 h-10 border-r flex items-center sm:text-xl text-sm pl-1.5">
                <p>Macarrão</p>
            </div>
            <div className="flex items-center gap-x-2.5">
                <div className="flex items-center gap-x-2.5">
                    <button className="bg-white border border-blue-500 text-blue-500 w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-indigo-100 transition[background-color] duration-500">-</button>
                    <p className="text-blue-950 border border-blue-500 w-10 h-10 rounded-xl flex items-center justify-center font-bold box-border pt-0.5">10</p>
                    <button className="bg-white border border-blue-500 text-blue-500 w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-indigo-100 transition[background-color] duration-500">+</button>
                </div>
                <button className="bg-red-500 text-white w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-red-600 transition[background-color] duration-500 flex items-center justify-center"><FaRegTrashAlt /></button>
            </div>
        </li>
    )
}

export default ListItem;