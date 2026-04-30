import logo from "@/public/images/icon.png";
import Image from "next/image";

const Header = () => {
    return (
        <header className="px-2.5 bg-white">
            <Image 
            src={logo}
            width={200}
            height={200}
            alt="Logo"
            className="w-20"
            priority
            />
        </header>
    )
}

export default Header;