import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Main() {
	const location = useLocation();

	const shouldRenderHeaderFooter = ![
		"/login",
		"/dashboard",
		"/signup",
	].includes(location.pathname);

	return (
		<div className="font-serif">
			{shouldRenderHeaderFooter && (
				<div className="">
					<Navbar />
				</div>
			)}
			<div className="min-h-[79vh]">
				<Outlet />
			</div>
			{shouldRenderHeaderFooter && <Footer />}
		</div>
	);
}

export default Main;
