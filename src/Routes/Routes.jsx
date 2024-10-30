import { createBrowserRouter } from "react-router-dom";
import CampaignList from "../Components/CampaignList";
import CreateCampaign from "../Components/CreateCampaign";

import UpdateCampaign from "../Components/UpdateCampaign ";
import Main from "../Layout/Main";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-campaign",
        element: <CreateCampaign />,
      },
      {
        path: "/all-campaigns",
        element: <CampaignList />,
      },
      {
        path: "/updateCampaign", // Ensure path matches your navigate
        element: <UpdateCampaign />,
      },
    ],
  },
]);
