import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

export default function Layout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
