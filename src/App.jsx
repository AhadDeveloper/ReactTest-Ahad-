import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ContextProvider from "./context/ContextProvider";
import {
  SigninPage,
  SignupPage,
  RootLayoutPage,
  HomePage,
  IncomePage,
  ExpensePage,
  AddIncomePage,
  ReportPage,
} from "./pages/index";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayoutPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "income", element: <IncomePage /> },
        { path: "income/add-income", element: <AddIncomePage /> },
        { path: "expense", element: <ExpensePage /> },
        { path: "/report", element: <ReportPage /> },
      ],
    },
    { path: "/signup", element: <SignupPage /> },
    { path: "/signin", element: <SigninPage /> },
  ]);

  return (
    <ContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ContextProvider>
  );
}

export default App;
