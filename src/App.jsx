import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadFilePage from "./page/UploadFilePage.jsx";
import ChatPage from "./page/ChatPage.jsx";

const routes = [
    {
        path: "/",
        element:<UploadFilePage />,
    },
    {
        path: "/chat/:filename",
        element:<ChatPage />,
    }
]

const router = createBrowserRouter(routes, {
    future:{
        v7_normalizeFormMethod: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }
});

const App = () => {
    return(
        <RouterProvider router={router} future={
            {
                v7_startTransition: true,
            }
        }/>
    );
}

export default App
