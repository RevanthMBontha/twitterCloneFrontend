import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PageLayout from "./layouts/PageLayout";
import BaseLayout from "./layouts/BaseLayout";
import { Tweets, Profile, Auth, TweetPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />}>
        <Route exact path="/login" element={<Auth />} />
        <Route path="home" element={<PageLayout />}>
          <Route index element={<Tweets />} />
        </Route>
        {/* Path for the Explore Tab */}
        {/* Path for the Notifications Tab */}
        {/* Path for the Messages Tab */}
        {/* Path for the Profile Tab */}
        <Route path="profile/:handle" element={<PageLayout />}>
          <Route index element={<Profile />} />
        </Route>
        {/* Path for the Single Tweet Page */}
        <Route path="tweet/:id" element={<PageLayout />}>
          <Route index element={<TweetPage />} />
        </Route>
        {/* <Route path="login" element={<Auth />} /> */}
      </Route>,
    ),
  );

  const queryClient = new QueryClient();

  return (
    <div className="h-full min-h-screen w-screen bg-black">
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <RouterProvider router={router} />
        </SkeletonTheme>
      </QueryClientProvider>
      <ToastContainer
        position="bottom-center"
        newestOnTop={true}
        theme="dark"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
