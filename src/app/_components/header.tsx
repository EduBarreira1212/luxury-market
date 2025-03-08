import HeaderRight from './header-right';
import NavbarPortal from './navbar-portal';
import { Input } from './ui/input';

type HeaderProps = {
    searchBarExists: boolean;
    variant: 'black' | 'white';
};

const Header = ({ searchBarExists, variant }: HeaderProps) => {
    return (
        <div className="flex w-full flex-row items-center justify-between px-5 pt-3">
            <div
                className={`flex items-center gap-3 ${variant == 'black' ? 'text-black' : 'text-white'}`}
            >
                <NavbarPortal />
                <h1 className="text-xl">Luxury Market</h1>
            </div>
            {searchBarExists && (
                <Input className="w-[35%] rounded-2xl" placeholder="Search" />
            )}
            <HeaderRight textColor={variant} />
        </div>
    );
};

export default Header;
