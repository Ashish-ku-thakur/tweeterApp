import Container from "./component/welcome/Container"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Sign from "./component/welcome/Sign";
import Subscriber from "./component/center/Subscriber";
import CenterContainer from "./component/center/CenterContainer";
import Comments from "./component/center/Comments";

const App = () => {
    let appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Container />,
            children: [
                {
                    path: "/",
                    element: <CenterContainer />
                },
                {
                    path: "/subscriber",
                    element: <Subscriber />
                },
                {
                    path: "/comments",
                    element: <Comments />
                }
            ]
        },
        {
            path: "/sign",
            element: <Sign />
        },


    ])

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}



export default App