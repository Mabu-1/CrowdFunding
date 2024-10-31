import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

const Navbar = () => {
  const { userAddress, connectWallet } = useWallet();

  const menu = (
    <ul className="flex items-center gap-5 text-center">
      <Link to="/">Home</Link>
      <Link to="/create-campaign">Create Campaign</Link>
      <Link to="/all-campaigns">Active Campaigns</Link>

      <Link to="/">
        {userAddress ? (
          <p>
            Logged in as: {userAddress.slice(0, 4)}......
            {userAddress.slice(38, 42)}
          </p>
        ) : (
          <button onClick={connectWallet}>Connect MetaMask</button>
        )}
      </Link>
    </ul>
  );

  return (
    <div className="fixed w-full backdrop-blur-xl py-5 z-50 text-white">
      <div className="w-3/4 mx-auto flex justify-between items-center">
        <div>
          <p className="text-3xl font-semibold">Logo</p>
        </div>
        {menu}
        <div>
          {userAddress ? (
            <div className="bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8] flex items-center gap-5 rounded-full">
              <p className="pl-4 text-white font-semibold">John Doe</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 rounded-full border-2 border-white">
                    <img
                      className="w-9 h-9 object-top rounded-full object-cover"
                      alt="Profile Picture"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow bg-gradient-to-r from-[#303dab] via-[#714faf] to-[#b638d8]"
                >
                  <li>
                    <Link>
                      <CgProfile /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <IoSettingsOutline /> Settings
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <MdLogout /> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-10 items-center font-semibold">
              <Link to={"/login"}>Login</Link>
              <Link
                to={"/signup"}
                className="bg-[#125ca6] text-white px-3 pt-1 pb-[0.4rem] rounded-md"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
