"use client";
import ListItem from "@/components/profile/homeComponents/listItem";
import { useState } from "react";

export default function Home() {
  const items = Array.from({ length: 10 });
  const [showAddItemBox, setShowAddItemBox] = useState<boolean>(false);

  return (
    <section className="w-full h-full p-5 flex flex-col gap-y-2.5 relative">
      {showAddItemBox &&
        <div className="absolute m-auto bg-white/60 w-full h-full left-0 top-0 flex justify-center" onClick={() => setShowAddItemBox(false)}>
          <div className="bg-white border-2 border-blue-500 w-96 h-96 mt-28 rounded-2xl text-blue-900 p-5 box-border space-y-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <p className="font-bold text-2xl">Adicionar item</p>
              <button className="w-9 h-9 rounded-lg bg-blue-500 border border-blue-400 font-bold text-white cursor-pointer transition[background-color] duration-500 hover:bg-blue-600" onClick={() => setShowAddItemBox(false)}>X</button>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <p className="font-bold text-xl">Nome do item:</p>
              <input type="text" name="newItem" id="newItem" className="border border-blue-500 outline-blue-600 rounded-lg p-2.5 text-blue-900" />
            </div>
            <div className="flex flex-col gap-y-2.5 grow">
              <p className="font-bold text-xl">Quantidade:</p>
              <div className="flex items-center gap-x-2.5">
                <button className="bg-white w-9 h-9 rounded-lg border border-blue-400 font-bold text-blue-500 cursor-pointer transition[background-color] duration-500 hover:bg-indigo-100 flex items-center justify-center">-</button>
                <div className="bg-white w-20 h-9 rounded-lg border border-blue-400 font-bold flex items-center justify-center">10</div>
                <button className="bg-white w-9 h-9 rounded-lg border border-blue-400 font-bold text-blue-500 cursor-pointer transition[background-color] duration-500 hover:bg-indigo-100 flex items-center justify-center">+</button>
              </div>
            </div>
            <button className="bg-blue-500 w-26 h-9 rounded-lg border border-blue-400 font-bold text-white cursor-pointer transition[background-color] duration-500 hover:bg-blue-600 flex items-center justify-center self-center">Adicionar</button>
          </div>
        </div>
      }
      <div className="w-full flex justify-between">
        <h1 className="text-blue-950 font-bold text-2xl">Lista de compras:</h1>
        <button className="bg-green-600 w-10 sm:w-48 h-10 rounded-xl text-xl font-bold cursor-pointer hover:bg-green-700 transition[background-color] duration-500 flex items-center justify-center gap-x-2.5" onClick={() => setShowAddItemBox(prev => !prev)}>
          +
          <p className="hidden sm:block">Adicionar</p>
        </button>
      </div>
      <ul className="w-full space-y-2.5 overflow-y-scroll">
        {items.map((_, index) => (
          <ListItem key={index} />
        ))}
      </ul >
    </section >
  );
}
