import Register from "../pages/register/Register"
import Login from "../pages/login/Login"
import Home from "../pages/home/Home"
import About from "../pages/about-us/About"
import Menu from "../pages/menu/Menu"
import FAQ from "../pages/faq/FAQ"
import Privacy from "../pages/privacy-policy/Privacy"
import Dashboard from "../pages/dashboard/Dashboard"


const routes = {
    data: [
        {
          name: "Home",
          path: "/",
          component: <Home/>,
          type: "main",
        },
        {
            name: "Register",
            path: "/Register",
            component: <Register/>,
            type: "",
        },
        {
            name: "Login",
            path: "/Login",
            component: <Login/>,
            type: "",
        },
        {
            name: "About",
            path: "/About",
            component: <About/>,
            type: "",
        },
        {
            name: "Menu",
            path: "/Menu",
            component: <Menu/>,
            type: "",
        },
        {
            name: "FAQ",
            path: "/FAQ",
            component: <FAQ/>,
            type: "",
        },
        {
            name: "Privacy",
            path: "/Privacy",
            component: <Privacy/>,
            type: "",
        },
        {
            name: "Dashboard",
            path: "/Dashboard",
            component: <Dashboard/>,
            type: "",
        }
    ]
}


export default routes