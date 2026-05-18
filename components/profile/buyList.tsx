"use client";
import { z, ZodError } from "zod";
import ListItem from "@/components/profile/homeComponents/listItem";
import { useEffect, useState } from "react";
import data from "../../app/data.json";
import { User } from "@/types/userType";

type ItemType = {
  itemName: string;
  amount: number;
  id: number;
};

export default function BuyList() {
  const [items, setItems] = useState<ItemType[]>(data);
  const [showAddItemBox, setShowAddItemBox] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Omit<ItemType, "id">>({
    itemName: "",
    amount: 1,
  });

  const removeItem = (data: { id: number }) => {
    const newArray = items.filter((item) => item.id !== data.id);
    setItems(newArray);
  };

  const addItem = () => {
    const itemSchema = z.object({
      itemName: z.string().min(1),
      amount: z.coerce.number().int().min(1),
    });

    try {
      itemSchema.parse(newItem);

      const newArray = [...items];
      newArray.unshift({ ...newItem, id: items.length + 1 }); // Alterar depois para o que vai vir do servidor

      setItems(newArray);
      setShowAddItemBox(false);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return console.log("Há campos vazios!");
      }
    }
  };

  const handleNewItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "newItemName") {
      setNewItem((prev) => ({
        ...prev,
        itemName: e.target.value,
      }));
    }

    if (e.target.id === "newItemAmount") {
      const value = e.target.value.replace(/\D/g, "");
      setNewItem((prev) => ({
        ...prev,
        amount: Number(value || 1),
      }));
    }
  };

  const decreaseNewItem = () => {
    if (newItem.amount > 1) {
      setNewItem((prev) => ({ ...prev, amount: prev.amount - 1 }));
    }
  };

  const increaseNewItem = () => {
    setNewItem((prev) => ({ ...prev, amount: prev.amount + 1 }));
  };

  useEffect(() => {
    if (newItem) {
      setNewItem({
        itemName: "",
        amount: 1,
      });
    }
  }, [showAddItemBox]);

  if (items.length < 1) {
    return null;
  }

  return (
    <section className="w-full h-full p-5 flex flex-col gap-y-2.5 relative">
      {showAddItemBox && (
        <div className="absolute m-auto bg-white/60 w-full h-full left-0 top-0 flex justify-center">
          <div
            className="bg-white border-2 border-blue-500 w-96 h-96 mt-28 rounded-2xl text-blue-900 p-5 box-border space-y-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <p className="font-bold text-2xl">Adicionar item</p>
              <button
                className="w-9 h-9 rounded-lg bg-blue-500 border border-blue-400 font-bold text-white cursor-pointer transition[background-color] duration-500 hover:bg-blue-600"
                onClick={() => setShowAddItemBox(false)}
              >
                X
              </button>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <p className="font-bold text-xl">Nome do item:</p>
              <input
                type="text"
                name="newItemName"
                className="border border-blue-500 outline-blue-600 rounded-lg p-2.5 text-blue-900"
                id="newItemName"
                onChange={handleNewItem}
                value={newItem.itemName}
              />
            </div>
            <div className="flex flex-col gap-y-2.5 grow">
              <p className="font-bold text-xl">Quantidade:</p>
              <div className="flex items-center gap-x-2.5">
                <button
                  className="bg-white w-9 h-9 rounded-lg border border-blue-400 font-bold text-blue-500 cursor-pointer transition-[background-color] duration-500 hover:bg-indigo-100 flex items-center justify-center"
                  id="decreaseNewItem"
                  onClick={decreaseNewItem}
                >
                  -
                </button>

                <input
                  type="text"
                  className="bg-white w-20 h-9 rounded-lg border border-blue-400 font-bold text-center"
                  name="newItemAmount"
                  id="newItemAmount"
                  value={newItem.amount}
                  onChange={handleNewItem}
                />

                <button
                  className="bg-white w-9 h-9 rounded-lg border border-blue-400 font-bold text-blue-500 cursor-pointer transition-[background-color] duration-500 hover:bg-indigo-100 flex items-center justify-center"
                  id="increaseNewItem"
                  onClick={increaseNewItem}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="bg-blue-500 w-26 h-9 rounded-lg border border-blue-400 font-bold text-white cursor-pointer transition-[background-color] duration-500 hover:bg-blue-600 flex items-center justify-center self-center"
              onClick={addItem}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex justify-between">
        <h1 className="text-blue-950 font-bold text-2xl">Lista de compras:</h1>
        <button
          className="bg-green-600 w-10 sm:w-48 h-10 rounded-xl text-xl font-bold cursor-pointer hover:bg-green-700 transition-[background-color] duration-500 flex items-center justify-center gap-x-2.5"
          onClick={() => setShowAddItemBox((prev) => !prev)}
        >
          +<p className="hidden sm:block">Adicionar</p>
        </button>
      </div>
      <ul className="w-full space-y-2.5 overflow-y-scroll">
        {items.map((item) => (
          <ListItem
            key={item.id}
            amount={item.amount}
            id={item.id}
            itemName={item.itemName}
            removeItem={removeItem}
          />
        ))}
      </ul>
    </section>
  );
}
