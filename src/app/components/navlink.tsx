const NavLink = (href: string, tittle: string) => {
    return (
        <a href= {href} className="block py-2 pl-2 pr-4 text-white">
            {tittle}
        </a>
    )
}

export default NavLink