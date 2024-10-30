import { useRef } from "react";
import {
	FaArrowRight,
	FaChevronLeft,
	FaChevronRight,
	FaRegStar,
	FaStar,
} from "react-icons/fa";
import CreateCampaign from "../Components/CreateCampaign";

const Home = () => {
	const reviewCarouselRef = useRef(null);
	const reviewer = {
		img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		name: "Full Name",
		role: "Student",
		rating: 3,
	};

	// Function to scroll the carousel
	const scrollCarousel = (ref, direction) => {
		if (ref.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	return (
		<div>
			{/* Banner */}
			<div className="relative h-screen w-full overflow-hidden pt-20">
				<video
					className="absolute w-full h-full object-cover"
					src="banner.mp4"
					autoPlay
					muted
					loop
				/>
				<div className="absolute w-full h-full backdrop-blur-xl bg-black opacity-70"></div>
				<div className="relative w-3/4 mx-auto text-center z-10 flex flex-col items-center justify-center h-full">
					<h1 className="text-gradient text-7xl font-bold text-center">
						Donate Money For <br /> Homeless and Helpless People
					</h1>
					<p className="text-2xl py-8 w-2/3">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						Praesentium adipisci in nesciunt tempora, quo autem! Dolor dolores
						officiis ipsam perspiciatis!
					</p>
					<button className="text-3xl bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-full px-6 py-3 font-semibold">
						Donate Now
					</button>
				</div>
			</div>
			<div className="w-3/4 mx-auto ">
				{/* Punch data */}
				<div className="bg-[#0d0617fe] mt-24 p-6 rounded-md grid grid-cols-3">
					<div className="text-center">
						<h5 className="text-5xl text-gradient">817</h5>
						<p className="text-xl">Total Users</p>
					</div>
					<div className="text-center border-x">
						<h5 className="text-5xl text-gradient">$23.7k</h5>
						<p className="text-xl">Total Raised</p>
					</div>
					<div className="text-center">
						<h5 className="text-5xl text-gradient">81</h5>
						<p className="text-xl">Total Events</p>
					</div>
				</div>

				{/* Learn more */}
				<div className="pt-24">
					<h4 className="text-2xl font-semibold">Learn More</h4>
					<div className="flex gap-8 mt-5">
						<div className="bg-[#0d0617fe] relative p-4 rounded-md">
							<div className="absolute w-72"></div>
							<h5 className="text-xl text-gradient">About Us</h5>
							<div className="relative">
								<img
									src="2.svg"
									alt="Image"
									className="float-right ml-4 mb-4 w-1/3 max-w-sm"
								/>
								<p className="text-justify py-3">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									tempore perferendis exercitationem illum eligendi? Dignissimos
									vero ipsam recusandae ab sint earum beatae vitae dicta, vel
									deleniti ad, possimus consectetur est illo rerum totam nemo
									sunt alias! Harum inventore molestias dolorum ex delectus.{" "}
									<br /> <br /> Lorem ipsum, dolor sit amet consectetur
									adipisicing elit. Vero delectus quo ab id quisquam harum eaque
									perspiciatis minima dolor laudantium quas, animi dicta
									accusantium suscipit asperiores ducimus quam nulla neque ea,
									quis tempore perferendis exercitationem illum eligendi?
									Dignissimos vero ipsam recusandae ab sint earum beatae vitae
									dicta, vel deleniti ad, possimus consectetur est illo rerum
									totam nemo sunt alias! Harum inventore molestias dolorum ex
									delectus. lorem35 <br /> <br /> Lorem ipsum dolor sit amet
									consectetur adipisicing elit. Beatae magnam totam optio sint
									assumenda quis perferendis natus vitae, quam incidunt
									laboriosam impedit enim! Voluptatibus, tempore officiis ipsa
									veritatis modi sint error adipisci unde cum quidem nostrum,
									sed a excepturi quod expedita repellat ipsam? Dolorem maiores
									ad tempore, aperiam molestiae, ipsa natus nostrum eius
									voluptatum amet praesentium fugit sint similique tenetur.
								</p>
							</div>
						</div>
						<div className="h-full">
							<div className="bg-[#0d0617fe] p-4 mb-8 rounded-md">
								<h5 className="text-xl pb-3 text-gradient">Our Vision</h5>
								<div className="relative">
									<img
										src="1.svg"
										alt="Image"
										className="float-right ml-4 mb-4 w-1/3 max-w-sm"
									/>
									<div className="text-justify py-3">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Ea reprehenderit inventore ipsam eos sequi, quia ipsum
											laborum veniam. Totam tenetur, consectetur corporis quas
											perspiciatis ea vel sit quaerat facere consequatur, nulla
											sint fuga qui maxime, cupiditate doloribus magni fugit
											deserunt. Repellendus et saepe ut nemo officiis, soluta
											aspernatur aut. Doloremque libero cumque sit placeat modi
											illo eaque blanditiis ipsum aliquam! lorem35
										</p>
									</div>
								</div>
							</div>
							<div className="bg-[#0d0617fe] p-4 rounded-md">
								<h5 className="text-xl pb-3 text-gradient">
									Why we started this platform?
								</h5>
								<div className="relative">
									<img
										src="3.svg"
										alt="Image"
										className="float-left ml-4 mb-4 mr-5 w-1/3 max-w-sm"
									/>
									<div className="text-justify py-3">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Ea reprehenderit inventore ipsam eos sequi, quia ipsum
											laborum veniam. Totam tenetur, consectetur corporis quas
											perspiciatis ea vel sit quaerat facere consequatur, nulla
											sint fuga qui maxime, cupiditate doloribus magni fugit
											deserunt. Repellendus et saepe ut nemo officiis, soluta
											aspernatur aut. Doloremque libero cumque sit placeat modi
											illo eaque blanditiis ipsum aliquam!
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Running projects */}
				<div className="py-24">
					<div className="flex gap-8">
						<h4 className="text-2xl font-semibold">Our Running Events</h4>
						<button className="flex gap-2 items-center text-gradient">
							<p>See more</p>
							<FaArrowRight className="text-xs text-[#714faf]" />
						</button>
					</div>
					<div className="grid grid-cols-3 gap-8">
						<div className="bg-[#0d0617fe] p-4 mt-5 rounded-md shadow">
							<div>
								<img className="rounded-md" src="dummy pic.jpg" alt="Event" />
							</div>
							<div className="py-3">
								<h3 className="text-4xl text-gradient font-semibold">
									Event Name
								</h3>
								<p className="pt-6">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Eligendi, fuga nam. Non consequatur ab perspiciatis.
								</p>
								<div className="py-6">
									<div className="flex justify-between items-baseline">
										<p>Fundraise goal</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$500.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Collected fund</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$0.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Participants</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>00</p>
									</div>
								</div>
								<div className="w-full grid grid-cols-2 gap-3 pt-1">
									<button className="border-2 border-[#714faf] text-gradient rounded-md py-3 text-xl font-semibold">
										Details
									</button>
									<button className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-md py-3 text-xl font-semibold">
										Donate
									</button>
								</div>
							</div>
						</div>
						<div className="bg-[#0d0617fe] p-4 mt-5 rounded-md shadow">
							<div>
								<img className="rounded-md" src="dummy pic.jpg" alt="Event" />
							</div>
							<div className="py-3">
								<h3 className="text-4xl text-gradient font-semibold">
									Event Name
								</h3>
								<p className="pt-6">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Eligendi, fuga nam. Non consequatur ab perspiciatis.
								</p>
								<div className="py-6">
									<div className="flex justify-between items-baseline">
										<p>Fundraise goal</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$500.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Collected fund</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$0.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Participants</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>00</p>
									</div>
								</div>
								<div className="w-full grid grid-cols-2 gap-3 pt-1">
									<button className="border-2 border-[#714faf] text-gradient rounded-md py-3 text-xl font-semibold">
										Details
									</button>
									<button className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-md py-3 text-xl font-semibold">
										Donate
									</button>
								</div>
							</div>
						</div>
						<div className="bg-[#0d0617fe] p-4 mt-5 rounded-md shadow">
							<div>
								<img className="rounded-md" src="dummy pic.jpg" alt="Event" />
							</div>
							<div className="py-3">
								<h3 className="text-4xl text-gradient font-semibold">
									Event Name
								</h3>
								<p className="pt-6">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Eligendi, fuga nam. Non consequatur ab perspiciatis.
								</p>
								<div className="py-6">
									<div className="flex justify-between items-baseline">
										<p>Fundraise goal</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$500.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Collected fund</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$0.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Participants</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>00</p>
									</div>
								</div>
								<div className="w-full grid grid-cols-2 gap-3 pt-1">
									<button className="border-2 border-[#714faf] text-gradient rounded-md py-3 text-xl font-semibold">
										Details
									</button>
									<button className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-md py-3 text-xl font-semibold">
										Donate
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Upcomming events */}
				<div className="pb-24">
					<div className="flex gap-8">
						<h4 className="text-2xl font-semibold">Our Upcomming Events</h4>
						<button className="flex gap-2 items-center text-gradient">
							<p>See more</p>
							<FaArrowRight className="text-xs text-[#714faf]" />
						</button>
					</div>
					<div className="grid grid-cols-3 gap-8">
						<div className="bg-[#0d0617fe] p-4 mt-5 rounded-md shadow">
							<div>
								<img className="rounded-md" src="dummy pic.jpg" alt="Event" />
							</div>
							<div className="py-3">
								<h3 className="text-4xl text-gradient font-semibold">
									Event Name
								</h3>
								<p className="pt-6">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Eligendi, fuga nam. Non consequatur ab perspiciatis.
								</p>
								<div className="py-6">
									<div className="flex justify-between items-baseline">
										<p>Fundraise goal</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$500.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Collected fund</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$0.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Participants</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>00</p>
									</div>
								</div>
								<div className="w-full grid grid-cols-2 gap-3 pt-1">
									<button className="border-2 border-[#714faf] text-gradient rounded-md py-3 text-xl font-semibold">
										Details
									</button>
									<button className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-md py-3 text-xl font-semibold">
										Donate
									</button>
								</div>
							</div>
						</div>
						<div className="bg-[#0d0617fe] p-4 mt-5 rounded-md shadow">
							<div>
								<img className="rounded-md" src="dummy pic.jpg" alt="Event" />
							</div>
							<div className="py-3">
								<h3 className="text-4xl text-gradient font-semibold">
									Event Name
								</h3>
								<p className="pt-6">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Eligendi, fuga nam. Non consequatur ab perspiciatis.
								</p>
								<div className="py-6">
									<div className="flex justify-between items-baseline">
										<p>Fundraise goal</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$500.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Collected fund</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$0.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Participants</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>00</p>
									</div>
								</div>
								<div className="w-full grid grid-cols-2 gap-3 pt-1">
									<button className="border-2 border-[#714faf] text-gradient rounded-md py-3 text-xl font-semibold">
										Details
									</button>
									<button className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-md py-3 text-xl font-semibold">
										Donate
									</button>
								</div>
							</div>
						</div>
						<div className="bg-[#0d0617fe] p-4 mt-5 rounded-md shadow">
							<div>
								<img className="rounded-md" src="dummy pic.jpg" alt="Event" />
							</div>
							<div className="py-3">
								<h3 className="text-4xl text-gradient font-semibold">
									Event Name
								</h3>
								<p className="pt-6">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Eligendi, fuga nam. Non consequatur ab perspiciatis.
								</p>
								<div className="py-6">
									<div className="flex justify-between items-baseline">
										<p>Fundraise goal</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$500.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Collected fund</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>$0.00</p>
									</div>
									<div className="flex justify-between items-baseline">
										<p>Participants</p>
										<div className="flex-grow mx-2 border-b border-dotted border-[#714faf]"></div>
										<p>00</p>
									</div>
								</div>
								<div className="w-full grid grid-cols-2 gap-3 pt-1">
									<button className="border-2 border-[#714faf] text-gradient rounded-md py-3 text-xl font-semibold">
										Details
									</button>
									<button className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-md py-3 text-xl font-semibold">
										Donate
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Revews */}
				<div className="pb-24">
					<div className="flex gap-2 items-center justify-between">
						<h4 className="text-2xl font-semibold">
							What the community say about us
						</h4>
						<div className="flex gap-2 text-2xl text-white">
							<FaChevronLeft
								onClick={() => scrollCarousel(reviewCarouselRef, "left")}
								className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-md p-1 cursor-pointer"
							/>
							<FaChevronRight
								onClick={() => scrollCarousel(reviewCarouselRef, "right")}
								className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] rounded-md p-1 cursor-pointer"
							/>
						</div>
					</div>
					<div
						ref={reviewCarouselRef}
						className="carousel carousel-center space-x-4 bg-[#0d0617fe] w-full p-4 mt-5 rounded-md"
					>
						<div className="border-2 border-[#714faf] rounded-md py-3 px-4 w-[490px]">
							<div className="flex gap-3">
								<div className="w-12 rounded-full border border-[#714faf] mt-1">
									<img
										className="w-12 h-12 object-top rounded-full object-cover"
										alt="Profile Picture"
										src={reviewer.img}
									/>
								</div>
								<div>
									<h5 className="font-semibold text-xl text-gradient">
										{reviewer.name}
									</h5>
									<p>{reviewer.role}</p>
								</div>
							</div>
							<div className="flex gap-1 mt-4 mb-5 items-center">
								{Array.from({ length: 5 }, (_, index) =>
									index < reviewer.rating ? (
										<FaStar key={index} className="text-yellow-400" />
									) : (
										<FaRegStar key={index} />
									)
								)}
							</div>
							<p className="text-justify">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
								voluptates quod recusandae. Natus unde iure harum molestias.
								Voluptates, impedit quam?
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
