"use client";
import { z, ZodError } from "zod";
import ListItem from "@/components/profile/homeComponents/listItem";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { API_URL, NEXT_API_URL } from "@/utils/apiURL";

type ItemType = {
  itemName: string;
  amount: number;
  id: number;
};

type API_DATA = {
  data: {
    hasNext: boolean;
    next?: number;
    itemData: ItemType[] | null;
  };
};

export default function BuyList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);
  const [serverSuccess, setServerSuccess] = useState<boolean>(false);
  const [invalidValueError, setInvalidValueError] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType[]>([]);
  const [showAddItemBox, setShowAddItemBox] = useState<boolean>(false);

  const [hasNext, setHasNext] = useState<boolean>(false);
  const [nextItemId, setNextItemId] = useState<number>(0);

  const [newItem, setNewItem] = useState<Omit<ItemType, "id">>({
    itemName: "",
    amount: 1,
  });

  const removeItem = async (data: { id: number }) => {
    const newArray = items.filter((item) => item.id !== data.id);

    try {
      setIsLoading(true);

      const deleteItem = await fetch(`${NEXT_API_URL}/item/delete/${data.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!deleteItem.ok) {
        return setServerError(true);
      }

      setServerSuccess(true);
      setItems(newArray);
    } catch (error) {
      setServerError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async () => {
    const itemSchema = z.object({
      itemName: z.string().min(1),
      amount: z.coerce.number().int().min(1).max(9999),
    });

    try {
      setIsLoading(true);
      itemSchema.parse(newItem);

      const data = await fetch(`${NEXT_API_URL}/item/create`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!data.ok) {
        return setError(true);
      }

      const newArray = [...items];
      const itemCreatedData = await data.json();

      newArray.unshift({ ...newItem, id: itemCreatedData.itemData.id });

      setItems(newArray);
      setServerSuccess(true);
      setShowAddItemBox(false);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return setInvalidValueError(true);
      }
    } finally {
      setIsLoading(false);
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
      if (Number(value) > 9999) {
        return null;
      }

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
    if (newItem.amount < 9999) {
      return setNewItem((prev) => ({ ...prev, amount: prev.amount + 1 }));
    }
  };

  useEffect(() => {
    if (newItem) {
      setNewItem({
        itemName: "",
        amount: 1,
      });
    }

    if (serverError) {
      setTimeout(() => {
        setServerError(false);
      }, 3000);
    }

    if (serverSuccess) {
      setTimeout(() => {
        setServerSuccess(false);
      }, 3000);
    }

    if (invalidValueError) {
      setTimeout(() => {
        setInvalidValueError(false);
      }, 3000);
    }
  }, [showAddItemBox, serverError, serverSuccess, invalidValueError]);

  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(`${NEXT_API_URL}/item`, {
          method: "GET",
          credentials: "include",
        });

        if (!data.ok) {
          setError(true);
        }

        const itemData: API_DATA = await data.json();

        if (itemData.data.hasNext) {
          setHasNext(true);
          setNextItemId(itemData.data.next!);
        }

        setItems(itemData.data.itemData!);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getItems();
  }, []);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${NEXT_API_URL}/item?from=${nextItemId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!data.ok) {
        setError(true);
      }

      const itemData: API_DATA = await data.json();
      console.log(itemData.data.hasNext);
      if (itemData.data.hasNext) {
        setHasNext(true);
        setNextItemId(itemData.data.next!);
      } else {
        setHasNext(false);
      }

      const newData = [...items, ...itemData.data.itemData!];
      setItems(newData);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length < 1 && !isLoading) {
    return <div>Não há itens na lista</div>;
  }

  if (isLoading && items.length < 1) {
    return <Loading />;
  }

  if (error && !isLoading) {
    return (
      <div className="w-3xs py-2.5 text-center bg-red-500 text-white border-red-700 rounded-xl">
        Ocorreu um erro ao exibir a lista
      </div>
    );
  }

  return (
    <section className="w-full h-full p-5 flex flex-col gap-y-2.5 relative">
      {serverError && (
        <div className="absolute bg-red-400 border border-red-600 rounded-xl w-3xs lg:w-96 h-14 self-center top-10 flex justify-center items-center text-white text-center z-20 font-bold">
          <p>Ocorreu um erro ao realizar operação.</p>
        </div>
      )}
      {invalidValueError && (
        <div className="absolute bg-yellow-400 border border-yellow-600 rounded-xl w-3xs lg:w-96 h-14 self-center top-10 z-20 flex justify-center items-center text-white text-center font-bold">
          <p>Dados inválidos, ou há campos vazios.</p>
        </div>
      )}
      {serverSuccess && (
        <div className="absolute bg-green-400 border border-green-600 rounded-xl w-3xs lg:w-96 h-14 self-center top-10 z-10 flex justify-center items-center text-white text-center">
          <p>Operação realizada com sucesso!.</p>
        </div>
      )}
      {showAddItemBox && (
        <div className="absolute m-auto bg-white/60 w-full h-full left-0 top-0 flex justify-center z-10">
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
        {items.length > 0 &&
          items.map((item) => (
            <ListItem
              key={item.id}
              amount={item.amount}
              id={item.id}
              itemName={item.itemName}
              removeItem={removeItem}
            />
          ))}
        {hasNext && !isLoading && (
          <button
            className="w-2xs h-10 rounded-lg bg-blue-500 border border-blue-400 font-bold text-white cursor-pointer transition[background-color] duration-500 hover:bg-blue-600"
            onClick={loadItems}
          >
            Ver mais
          </button>
        )}

        {isLoading && !serverError && (
          <div className="w-2xs h-10 rounded-lg bg-blue-500 border border-blue-400 font-bold text-white flex items-center justify-center">
            <Loading />
          </div>
        )}
      </ul>
    </section>
  );
}
