import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { Toaster } from 'react-hot-toast';
import { toasterOptions } from "./config/toasterConfig";

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={toasterOptions}
      />

    </>
  )
}

export default App
