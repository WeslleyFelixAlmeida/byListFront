"use client";

import Privacy from "@/components/profile/privacy";
import PersonalProfile from "@/components/profile/personalProfile";

import { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosLock } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

import ExitBox from "@/components/profile/exitBox";
import BuyList from "@/components/profile/buyList";
import type { User } from "@/types/userType";
import { NEXT_API_URL } from "@/utils/apiURL";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
  });

  const [showLeftSide, setShowLeftSide] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<
    "profile" | "privacy" | "buyList"
  >("buyList");
  const [showExitBox, setShowExitBox] = useState<boolean>(false);

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const showStyle = "w-1/5 min-w-3xs h-full";
  const hideStyle = "w-16 min-w-11 h-16";

  const toggleLeftSideSize = () => {
    setShowLeftSide((prev) => !prev);
  };

  const changePage = (page: "profile" | "privacy" | "buyList") => {
    switch (page) {
      case "buyList":
        setCurrentPage("buyList");
        break;
      case "privacy":
        setCurrentPage("privacy");
        break;
      case "profile":
        setCurrentPage("profile");
        break;
    }

    setShowLeftSide(false);
  };

  const exit = async () => {
    const request = await fetch(`${NEXT_API_URL}/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (!request.ok) {
      setErrorMessage(true);
    }

    router.push("/profile");
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const request = await fetch(`${NEXT_API_URL}/user`, {
          method: "GET",
          credentials: "include",
        });

        if (request.status === 401) {
          router.push("/refresh_auth?redirect=/profile");

          return;
        }
        if (!request.ok) {
          router.push("/login");
        }

        const userData = await request.json();
        console.log(userData);
        setUserData(userData);
      } catch (error) {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(false), 3000);
    }
  }, [errorMessage]);

  if (isLoading) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <section className="h-dvh bg-white bg-linear-to-t from-gray-100 via-gray-200 to-slate-200 flex relative min-h-200">
      {showExitBox && (
        <ExitBox
          hideBox={setShowExitBox}
          exit={exit}
        />
      )}

      {errorMessage && (
        <div className="w-100 h-14 bg-red-400 text-white rounded-xl border-red-700 absolute top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center font-bold">
          <p>Ocorreu um erro ao realizar operação.</p>
        </div>
      )}

      <div
        className={`${showLeftSide ? showStyle : hideStyle} 
                ${showLeftSide ? "border-b border-r bg-gray-50" : "bg-white"} 
                sm:border-b-0 sm:border-r border-blue-500 
                text-blue-950 font-bold flex flex-col space-y-2.5 p-2.5 sm:bg-gray-50 transition-[width, min-width] duration-800 absolute -top-16 sm:top-0 overflow-hidden sm:h-full z-10`}
      >
        <button
          onClick={toggleLeftSideSize}
          className="sm:hidden flex items-center self-end transition-[padding] duration-800 mr-1.5 mt-1 mb-9"
        >
          <GiHamburgerMenu className="text-blue-400 text-3xl" />
        </button>

        <button
          onClick={toggleLeftSideSize}
          className="cursor-pointer rounded-3xl hidden sm:flex items-center self-end transition-[padding] duration-800 mr-1"
        >
          {!showLeftSide && (
            <FaRegArrowAltCircleRight className="text-blue-400 text-4xl" />
          )}
          {showLeftSide && (
            <FaRegArrowAltCircleLeft className="text-blue-400 text-4xl" />
          )}
        </button>

        {/* Botão 1 */}
        {showLeftSide && (
          <button
            onClick={() => changePage("buyList")}
            className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 px-2.5 w-full
                        ${currentPage === "buyList" ? "bg-blue-100" : ""}`}
          >
            <p className="w-8">
              <IoMdHome className="text-blue-400 text-3xl" />
            </p>
            <p className="mt-0.5">Home</p>
          </button>
        )}
        {!showLeftSide && (
          <button
            onClick={() => changePage("buyList")}
            className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 justify-center
                        ${currentPage === "buyList" ? "bg-blue-100" : ""}`}
          >
            <p className="w-8">
              <IoMdHome className="text-blue-400 text-3xl" />
            </p>
          </button>
        )}

        {/* Botão 2 */}
        {showLeftSide && (
          <button
            onClick={() => changePage("profile")}
            className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 px-2.5 w-full
                        ${currentPage === "profile" ? "bg-blue-100" : ""}`}
          >
            <p className="w-8">
              <CgProfile className="text-blue-400 text-3xl" />
            </p>
            <p className="mt-0.5">Perfil</p>
          </button>
        )}
        {!showLeftSide && (
          <button
            onClick={() => changePage("profile")}
            className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 justify-center
                        ${currentPage === "profile" ? "bg-blue-100" : ""}`}
          >
            <p className="w-8">
              <CgProfile className="text-blue-400 text-3xl" />
            </p>
          </button>
        )}

        {/* Botão 3 */}
        {showLeftSide && (
          <button
            onClick={() => changePage("privacy")}
            className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 px-2.5 w-full
                        ${currentPage === "privacy" ? "bg-blue-100" : ""}`}
          >
            <p className="w-8">
              <IoIosLock className="text-blue-400 text-3xl" />
            </p>
            <p className="mt-0.5">Privacidade</p>
          </button>
        )}
        {!showLeftSide && (
          <button
            onClick={() => changePage("privacy")}
            className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 justify-center
                        ${currentPage === "privacy" ? "bg-blue-100" : ""}`}
          >
            <p className="w-8">
              <IoIosLock className="text-blue-400 text-3xl" />
            </p>
          </button>
        )}

        {/* Botão 4 */}
        {showLeftSide && (
          <button
            onClick={() => setShowExitBox(true)}
            className="h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 px-2.5 w-full"
          >
            <p className="w-8">
              <MdExitToApp className="text-blue-400 text-3xl rotate-180" />
            </p>
            <p className="mt-0.5">Sair</p>
          </button>
        )}
        {!showLeftSide && (
          <button
            onClick={() => setShowExitBox(true)}
            className="h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 justify-center"
          >
            <p className="w-8">
              <MdExitToApp className="text-blue-400 text-3xl rotate-180" />
            </p>
          </button>
        )}
      </div>

      <div
        className="w-full sm:pl-16 flex items-center justify-center"
        onClick={() => {
          showLeftSide ? setShowLeftSide((prev) => !prev) : "";
        }}
      >
        {currentPage === "buyList" && <BuyList />}
        {currentPage === "privacy" && (
          <Privacy
            name={userData.name}
            email={userData.email}
          />
        )}
        {currentPage === "profile" && (
          <PersonalProfile
            user={userData}
            changePage={changePage}
          />
        )}
      </div>
    </section>
  );
};

export default Profile;
