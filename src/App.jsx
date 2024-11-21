import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadFilePage from "./page/UploadFilePage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element:<UploadFilePage />,
    }
])
const App = () => {
    return(
        <RouterProvider router={router}/>
    );
}

export default App
