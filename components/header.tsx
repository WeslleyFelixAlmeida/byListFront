import logo from "@/public/images/icon.png";
import Image from "next/image";

const Header = () => {
    return (
        <header className="bg-white flex w-full justify-end sm:justify-start pr-2 sm:p-0">
            <Image
                src={logo}
                width={200}
                height={200}
                alt="Logo"
                className="w-16"
                priority
            />
        </header>
    )
}

export default Header;