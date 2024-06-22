import Register from "../pages/register/Register"
import Login from "../pages/login/Login"
import Home from "../pages/home/Home"
import About from "../pages/about-us/About"

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
        }
    ]
}


export default routes