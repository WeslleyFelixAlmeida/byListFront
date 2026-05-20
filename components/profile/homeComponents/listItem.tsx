"use client";
import Loading from "@/components/loading";
import { NEXT_API_URL } from "@/utils/apiURL";
import { use, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { z, ZodError } from "zod";
import { GoVerified } from "react-icons/go";

type ListItemProps = {
  id: number;
  itemName: string;
  amount: number;
  removeItem: Function;
};

const ListItem = (props: ListItemProps) => {
  const [amount, setAmount] = useState<number>(props.amount);
  const [itemName, setItemName] = useState<string>(props.itemName);

  const [newAmount, setNewAmount] = useState<number>(amount);
  const [newItemName, setNewItemName] = useState<string>(itemName);
  const [isEditingAmount, setIsEditingAmount] = useState<boolean>(false);
  const [isEditingItemName, setIsEditingItemName] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [successAction, setSuccessAction] = useState<boolean>(false);
  const [animateSuccessAction, setAnimateSuccessAction] =
    useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "newAmount") {
      const onlyNumbers = e.target.value.replace(/\D/g, "");
      if (onlyNumbers === "") {
        setNewAmount(0);
        return;
      }

      if (Number(e.target.value) > 9999) {
        return;
      }

      setNewAmount(Number(onlyNumbers));
    }
    if (e.target.id === "newItemName") {
      setNewItemName(e.target.value);
    }
  };

  const cancelChange = () => {
    setNewAmount(props.amount);
    setNewItemName("");
    setIsEditingAmount(false);
    setIsEditingItemName(false);
    setSuccessAction(false);
  };

  const changeItemName = async () => {
    const changeItemSchema = z.string().min(1);

    try {
      const validate = changeItemSchema.parse(newItemName);

      setIsLoading(true);
      const data = await fetch(
        `${NEXT_API_URL}/item/update/itemName/${props.id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ itemName: newItemName }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!data.ok) {
        return setError(true);
      }

      setItemName(newItemName);
      setSuccessAction(true);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const changeAmount = async () => {
    const changeAmountSchema = z.number().min(1).max(9999);

    try {
      const validate = changeAmountSchema.parse(newAmount);

      setIsLoading(true);

      const data = await fetch(
        `${NEXT_API_URL}/item/update/amount/${props.id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ amount: newAmount }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!data.ok) {
        return setError(true);
      }

      setAmount(newAmount);
      setSuccessAction(true);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(false), 3000);
    }

    if (successAction) {
      setTimeout(() => setAnimateSuccessAction(true), 10);

      setTimeout(() => cancelChange(), 3000);
    }
  }, [error, successAction]);

  return (
    <li className="w-full sm:w-3/5 max-w-3xl flex justify-between border border-blue-500 rounded-xl min-h-15 items-center bg-white flex-col gap-y-2.5 lg:flex-row lg:items-center px-2.5 py-2.5 lg:py-0 relative overflow-hidden">
      {successAction && (
        <div className="h-full w-full absolute left-1/2 top-1/2 -translate-1/2 z-20 bg-white border-green-600">
          <div
            className={`h-full bg-green-500 flex justify-end items-center text-3xl text-green-700 px-2.5 py-2.5 
          transition-[width]
          duration-2000
          ease-in-out
          ${animateSuccessAction ? "w-full" : "w-0"}
          `}
          >
            <GoVerified />
          </div>
        </div>
      )}

      {!isEditingItemName && !isEditingAmount && (
        <div className="text-blue-950 w-full lg:w-1/4 sm:min-w-24 h-10 border-b lg:border-b-0 lg:border-r border-blue-500 flex items-center sm:text-xl text-sm pl-1.5 pb-2.5 lg:pb-0">
          <p className="font-bold text-xl">{itemName}</p>
          <button
            className="bg-blue-500 border border-blue-500 text-white w-10 h-10 rounded-xl text-xl cursor-pointer hover:bg-blue-600 transition-[background-color] duration-500 flex items-center justify-center ml-auto mr-1"
            onClick={() => setIsEditingItemName(true)}
          >
            <FaEdit />
          </button>
        </div>
      )}

      {isEditingItemName && !isEditingAmount && (
        <div className="flex w-full gap-x-2.5 text-blue-950 flex-col relative gap-y-2.5 lg:flex-row lg:gap-y-0 items-baseline lg:items-center ">
          <p className="font-bold">Novo título: </p>
          <input
            type="text"
            name="newItemName"
            id="newItemName"
            placeholder="Novo título"
            className="text-blue-950 border border-blue-500 h-10 rounded-xl flex items-center justify-center gap-x-1.5 font-bold box-border pt-0.5 outline-blue-500 grow px-3"
            value={newItemName}
            onChange={handleChange}
            disabled={isLoading ? true : false}
          />

          {!isLoading && (
            <button
              className="bg-blue-500 border border-blue-500 text-white w-28 h-10 rounded-xl text-xl cursor-pointer hover:bg-blue-600 transition-[background-color] duration-500"
              onClick={changeItemName}
            >
              Alterar
            </button>
          )}

          {isLoading && (
            <div className="bg-blue-500 text-whiteh-10 rounded-xl text-xl ml-auto w-full lg:w-10 h-10">
              <Loading
                width="w-10"
                height="h-10"
                size="text-3xl"
              />
            </div>
          )}
          <button
            className="bg-red-500 border border-red-500 text-white w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-red-600 transition-[background-color] absolute right-1.5 lg:static"
            onClick={cancelChange}
            disabled={isLoading ? true : false}
          >
            X
          </button>
        </div>
      )}

      {!isEditingAmount && !isEditingItemName && (
        <div className="flex items-center w-full lg:w-fit gap-x-2.5">
          <div className="flex items-center gap-x-2.5">
            <div className="text-blue-950 border border-blue-500 w-32 h-10 rounded-xl flex items-center justify-center gap-x-1.5 font-bold box-border pt-0.5">
              <p>{amount}</p>
              <p>-</p>
              <p className="text-blue-950 font-bold">{"Unidade(s)"}</p>
            </div>
          </div>
          <button
            className="bg-blue-500 border border-blue-500 text-white w-10 h-10 rounded-xl text-xl cursor-pointer hover:bg-blue-600 transition-[background-color] duration-500 flex items-center justify-center"
            onClick={() => setIsEditingAmount(true)}
          >
            <FaEdit />
          </button>
          <button
            className="bg-red-500 text-white w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-red-600 transition-[background-color] duration-500 flex items-center justify-center"
            onClick={() => props.removeItem({ id: props.id })}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      )}

      {isEditingAmount && !isEditingItemName && (
        <div className="flex items-baseline lg:items-center gap-x-2.5 w-full flex-col gap-y-2.5 lg:flex-row relative">
          <p className="font-bold text-blue-950">Nova quantidade:</p>
          <input
            type="text"
            name="newAmount"
            id="newAmount"
            className="text-blue-950 border border-blue-500 w-20 h-10 rounded-xl flex items-center justify-center gap-x-1.5 font-bold box-border pt-0.5 outline-blue-500 px-3 text-center"
            value={newAmount}
            onChange={handleChange}
            disabled={isLoading ? true : false}
          />
          {!isLoading && (
            <button
              className="bg-blue-500 border border-blue-500 text-whiteh-10 rounded-xl text-xl cursor-pointer hover:bg-blue-600 transition-[background-color] duration-500 ml-auto w-full lg:w-28 h-10"
              onClick={changeAmount}
            >
              Alterar
            </button>
          )}

          {isLoading && (
            <div className="bg-blue-500 text-whiteh-10 rounded-xl text-xl ml-auto w-full lg:w-10 h-10">
              <Loading
                width="w-10"
                height="h-10"
                size="text-3xl"
              />
            </div>
          )}

          <button
            className="bg-red-500 border border-red-500 text-white w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-red-600 transition-[background-color] absolute right-1 lg:static"
            onClick={cancelChange}
            disabled={isLoading ? true : false}
          >
            X
          </button>
        </div>
      )}
    </li>
  );
};

export default ListItem;
