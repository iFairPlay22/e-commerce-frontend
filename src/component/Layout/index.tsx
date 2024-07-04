import { Outlet } from "react-router-dom";
import { HeaderComponent } from "./Header";

export const Layout = () => (
    <>
        <HeaderComponent
            links={[
                { title: 'Catalog',       link: '/catalog'       },
                { title: 'Basket',        link: '/basket'        },
                { title: 'Past commands', link: '/past-commands' },
            ]}
        />
        <Outlet/>
    </>
)