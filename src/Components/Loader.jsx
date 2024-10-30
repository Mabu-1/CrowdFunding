import HashLoader from "react-spinners/HashLoader";

function Loader() {
	return (
		<div className="sweet-loading">
			<HashLoader
				color={"#616569"}
				size={25}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
}

export default Loader;
