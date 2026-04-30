"use client";

import Image from "next/image";
import Home from "@/app/page";
import Privacy from "@/components/profile/privacy";
import PersonalProfile from "@/components/profile/personalProfile";

import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosLock } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";


const Profile = () => {
    const [userData, setUserData] = useState();//Essa variável deve ser mandada para as páginas home, privacidade e perfil
    const [showLeftSide, setShowLeftSide] = useState<boolean>(!false);
    const [currentPage, setCurrentPage] = useState<"profile" | "privacy" | "home">("home");
    const showStyle = "w-1/5";
    const hideStyle = "w-16";

    const toggleLeftSideSize = () => {
        if (showLeftSide) {
            return setShowLeftSide(prev => !prev);
        }
        setShowLeftSide(prev => !prev);
    }

    return (
        <section className="h-dvh bg-white bg-linear-to-t from-gray-100 via-gray-200 to-slate-200 flex relative">
            <div className={`${showLeftSide ? showStyle : hideStyle} 
                text-blue-950 font-bold flex flex-col space-y-2.5 p-2.5 bg-gray-50 border-r border-blue-500 transition-[width] duration-800 absolute h-full overflow-hidden`}>
                <button
                    onClick={toggleLeftSideSize}
                    className={`cursor-pointer rounded-3xl flex items-center gap-x-2.5 self-end transition-[padding] duration-800 mr-1
                    `}
                >
                    {!showLeftSide &&
                        <FaRegArrowAltCircleRight className="text-blue-400 text-4xl rounded-4xl border-blue-400" />}
                    {showLeftSide &&
                        <FaRegArrowAltCircleLeft className="text-blue-400 text-4xl rounded-4xl border-blue-400" />}
                </button>
                {/* Botão 1 */}
                {showLeftSide &&
                    <button
                        onClick={() => setCurrentPage("home")}
                        className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 px-2.5 w-3xs
                     ${currentPage === "home" ? "bg-blue-100" : ""}
                    `}>
                        <IoMdHome className="text-blue-400 text-3xl rounded-4xl border-blue-400" />
                        <p className="mt-0.5">Home</p>
                    </button>}
                {!showLeftSide &&
                    <button
                        onClick={() => setCurrentPage("home")}
                        className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 justify-center
                    ${currentPage === "home" ? "bg-blue-100" : ""}
                    `}>
                        <IoMdHome className="text-blue-400 text-3xl rounded-4xl border-blue-400" />
                    </button>
                }

                {/* Botão 2 */}
                {showLeftSide &&
                    <button
                        onClick={() => setCurrentPage("profile")}
                        className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 px-2.5 w-3xs
                     ${currentPage === "profile" ? "bg-blue-100" : ""}
                    `}>
                        <CgProfile className="text-blue-400 text-3xl rounded-4xl border-blue-400" />
                        <p className="mt-0.5">Perfil</p>
                    </button>}
                {!showLeftSide &&
                    <button
                        onClick={() => setCurrentPage("profile")}
                        className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 justify-center
                    ${currentPage === "profile" ? "bg-blue-100" : ""}
                    `}>
                        <CgProfile className="text-blue-400 text-3xl rounded-4xl border-blue-400" />
                    </button>
                }

                {/* Botão 3 */}
                {showLeftSide &&
                    <button
                        onClick={() => setCurrentPage("privacy")}
                        className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 px-2.5 w-3xs
                     ${currentPage === "privacy" ? "bg-blue-100" : ""}
                    `}>
                        <IoIosLock className="text-blue-400 text-3xl rounded-4xl border-blue-400" />
                        <p className="mt-0.5">Privacidade</p>
                    </button>}
                {!showLeftSide &&
                    <button
                        onClick={() => setCurrentPage("privacy")}
                        className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 justify-center
                    ${currentPage === "privacy" ? "bg-blue-100" : ""}
                    `}>
                        <IoIosLock className="text-blue-400 text-3xl rounded-4xl border-blue-400" />
                    </button>
                }

                {/* Botão 4 */}
                {showLeftSide &&
                    <button
                        onClick={() => console.log("SAIU")}
                        className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 px-2.5 w-3xs`}>
                        <MdExitToApp className="text-blue-400 text-3xl rounded-4xl border-blue-400 rotate-180" />
                        <p className="mt-0.5">Sair</p>
                    </button>}
                {!showLeftSide &&
                    <button
                        onClick={() => console.log("SAIU")}
                        className={`h-11 cursor-pointer rounded-3xl flex items-center gap-x-2.5 justify-center`}>
                        <MdExitToApp className="text-blue-400 text-3xl rounded-4xl border-blue-400 rotate-180" />
                    </button>
                }
            </div>
            <div className="bg-green-400 w-full pl-16 flex items-center justify-center">
                {currentPage === "home" && <Home />}
                {currentPage === "privacy" && <Privacy />}
                {currentPage === "profile" && <PersonalProfile />}
            </div>
        </section >
    )
}

export default Profile;