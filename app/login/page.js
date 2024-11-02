"use client";
import { React, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [reg, setReg] = useState(true);
  const [pending, setpending] = useState(false);

  const router = useRouter();

  useEffect(() => {
    document.title = "Login - Linkster";
    if (session) {
      router.push(`/${username}`);
    }
  }, [router, session]);

  const handleRegister = () => {
    setError(null);
    setReg(!reg);
  };

  async function handleSignIn(e) {
    e.preventDefault();
    setError(null);
    if (!username || !password) {
      setError("Please fill the credentials.");
      return;
    }

    setpending(true);
    try {
      const res = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid Credentials");
      } else {
        router.replace(`/${username}`);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setpending(false);
    }
  }

  async function handleReg(e) {
    e.preventDefault();
    setError(null);
    if (!username || !password || !email) {
      setError("Must provide all credentials.");
      return;
    }

    setpending(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        setReg(!reg);
        router.push("/login");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Something went wrong.");
    } finally {
      setpending(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl text-center font-bold">Continue to Login</h1>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-center items-center text-white py-14 container">
          <div
            className={`${
              reg ? "hidden" : ""
            } w-[80%] md:w-[23%] md:min-w-64 min-w-50 pt-8 mr-8`}
          >
            <form onSubmit={handleSignIn}>
              <div className="w-full">
                <div className="w-full">
                  <label htmlFor="username" className="pl-2 mt-4">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    id="username"
                    name="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="bg-transparent border border-white w-full rounded-lg p-[4px]"
                  ></input>
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="pl-2 pt-4">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    id="password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="bg-transparent border border-white w-full rounded-lg p-[4px]"
                  ></input>
                </div>
              </div>
              {error && (
                <div>
                  <span className="text-red-700">{error}</span>
                </div>
              )}
              <div className="pt-4 mt-2">
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Sign In
                  </span>
                </button>
              </div>
            </form>
            <div>
              <span>
                Don&apos;t have an account |
                <span
                  onClick={handleRegister}
                  className="text-blue-600 cursor-pointer"
                >
                  {" "}
                  Register
                </span>
              </span>
            </div>
          </div>
          {/* For New Registratio */}
          <div
            className={`${
              !reg ? "hidden" : ""
            } w-[80%] md:w-[23%] md:min-w-64 min-w-50 pt-8 mr-8`}
          >
            <form onSubmit={handleReg}>
              <div className="">
                <div>
                  <label htmlFor="rusername" className="pl-2 mt-4">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    id="rusername"
                    name="rusername"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="bg-transparent border border-white w-full rounded-lg p-[4px]"
                  ></input>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="pl-2 pt-4">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    id="email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-transparent border border-white w-full rounded-lg p-[4px]"
                  ></input>
                </div>
                <div className="mt-4">
                  <label htmlFor="rpassword" className="pl-2 pt-4">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    id="rpassword"
                    name="rpassword"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="bg-transparent border border-white w-full rounded-lg p-[4px]"
                  ></input>
                </div>
              </div>
              {error && (
                <div>
                  <span className="text-red-700">{error}</span>
                </div>
              )}
              <div className="pt-4 mt-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {pending ? "Registering" : "Register"}
                  </span>
                </button>
              </div>
            </form>
            <div>
              <span>
                Already have an account |
                <span
                  onClick={handleRegister}
                  className="text-blue-600 cursor-pointer"
                >
                  {" "}
                  Sign In
                </span>
              </span>
            </div>
          </div>{" "}
          <div className="bg-zinc-700 md:w-[2px] md:h-80 h-[2px] w-[80%]"></div>
          <div className="flex flex-row justify-around md:flex-col w-full md:w-[23%] gap-1 md:gap-4 p-2 md:p-10">
            <button className="flex items-center md:min-w-64 border border-gray-300 rounded-full md:rounded-lg shadow-md max-w-xs pl-3 pr-1 md:px-6 py-3 md:py-2 text-sm font-medium hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      ></path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              <span className="hidden md:block">Continue with Google</span>
            </button>

            <button className="flex items-center md:min-w-64 border border-gray-300 rounded-full md:rounded-lg shadow-md max-w-xs pl-3 pr-1 md:px-6 py-3 md:py-2 text-sm font-medium hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 -2 44 44"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-702.000000, -265.000000)"
                    fill="#007EBB"
                  >
                    <path
                      d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z"
                      id="LinkedIn"
                    ></path>
                  </g>
                </g>
              </svg>
              <span className="hidden md:block">Continue with LinkedIn</span>
            </button>

            <button className="flex items-center md:min-w-64 border border-gray-300 rounded-full md:rounded-lg shadow-md max-w-xs px-2 md:px-6 py-3 md:py-2 text-sm font-medium hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 48 48"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-200.000000, -160.000000)"
                    fill="#4460A0"
                  >
                    <path
                      d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                      id="Facebook"
                    ></path>
                  </g>
                </g>
              </svg>

              <span className="hidden md:block">Continue with Facebook</span>
            </button>

            <button
              onClick={() => signIn()}
              className="flex items-center justify-center md:min-w-64 border border-gray-300 rounded-full md:rounded-lg shadow-md max-w-xs pl-3 pr-1 md:px-6 py-3 text-sm font-medium hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 73 73"
                version="1.1"
              >
                <g
                  id="team-collaboration/version-control/github"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="container"
                    transform="translate(2.000000, 2.000000)"
                    fillRule="nonzero"
                  >
                    <rect
                      id="mask"
                      stroke="#000000"
                      strokeWidth="2"
                      fill="#000000"
                      x="-1"
                      y="-1"
                      width="71"
                      height="71"
                      rx="14"
                    ></rect>
                    <path
                      d="M58.3067362,21.4281798 C55.895743,17.2972267 52.6253846,14.0267453 48.4948004,11.615998 C44.3636013,9.20512774 39.8535636,8 34.9614901,8 C30.0700314,8 25.5585181,9.20549662 21.4281798,11.615998 C17.2972267,14.0266224 14.0269912,17.2972267 11.615998,21.4281798 C9.20537366,25.5590099 8,30.0699084 8,34.9607523 C8,40.8357654 9.71405782,46.1187277 13.1430342,50.8109917 C16.5716416,55.5036246 21.0008949,58.7507436 26.4304251,60.5527176 C27.0624378,60.6700211 27.5302994,60.5875152 27.8345016,60.3072901 C28.1388268,60.0266961 28.290805,59.6752774 28.290805,59.2545094 C28.290805,59.1842994 28.2847799,58.5526556 28.2730988,57.3588401 C28.2610487,56.1650247 28.2553926,55.1235563 28.2553926,54.2349267 L27.4479164,54.3746089 C26.9330843,54.468919 26.2836113,54.5088809 25.4994975,54.4975686 C24.7157525,54.4866252 23.9021284,54.4044881 23.0597317,54.2517722 C22.2169661,54.1004088 21.4330982,53.749359 20.7075131,53.1993604 C19.982297,52.6493618 19.4674649,51.9294329 19.1631397,51.0406804 L18.8120898,50.2328353 C18.5780976,49.6950097 18.2097104,49.0975487 17.7064365,48.4426655 C17.2031625,47.7871675 16.6942324,47.3427912 16.1794003,47.108799 L15.9336039,46.9328437 C15.7698216,46.815909 15.6178435,46.6748743 15.4773006,46.511215 C15.3368806,46.3475556 15.2317501,46.1837734 15.1615401,46.0197452 C15.0912072,45.855594 15.1494901,45.7209532 15.3370036,45.6153308 C15.5245171,45.5097084 15.8633939,45.4584343 16.3551097,45.4584343 L17.0569635,45.5633189 C17.5250709,45.6571371 18.104088,45.9373622 18.7947525,46.4057156 C19.4850481,46.8737001 20.052507,47.4821045 20.4972521,48.230683 C21.0358155,49.1905062 21.6846737,49.9218703 22.4456711,50.4251443 C23.2060537,50.9284182 23.9727072,51.1796248 24.744894,51.1796248 C25.5170807,51.1796248 26.1840139,51.121096 26.7459396,51.0046532 C27.3072505,50.8875956 27.8338868,50.7116403 28.3256025,50.477771 C28.5362325,48.9090515 29.1097164,47.7039238 30.0455624,46.8615271 C28.7116959,46.721353 27.5124702,46.5102313 26.4472706,46.2295144 C25.3826858,45.9484285 24.2825656,45.4922482 23.1476478,44.8597436 C22.0121153,44.2280998 21.0701212,43.44374 20.3214198,42.5080169 C19.5725954,41.571802 18.9580429,40.3426971 18.4786232,38.821809 C17.9989575,37.300306 17.7590632,35.5451796 17.7590632,33.5559381 C17.7590632,30.7235621 18.6837199,28.3133066 20.5326645,26.3238191 C19.6665366,24.1944035 19.7483048,21.8072644 20.778215,19.1626478 C21.4569523,18.951772 22.4635002,19.1100211 23.7973667,19.6364115 C25.1314792,20.1630477 26.1082708,20.6141868 26.7287253,20.9882301 C27.3491798,21.3621504 27.8463057,21.6790175 28.2208409,21.9360032 C30.3978419,21.3277217 32.644438,21.0235195 34.9612442,21.0235195 C37.2780503,21.0235195 39.5251383,21.3277217 41.7022622,21.9360032 L43.0362517,21.0938524 C43.9484895,20.5319267 45.0257392,20.0169716 46.2654186,19.5488642 C47.5058357,19.0810026 48.4543466,18.9521409 49.1099676,19.1630167 C50.1627483,21.8077563 50.2565666,24.1947724 49.3901927,26.324188 C51.2390143,28.3136755 52.1640399,30.7245457 52.1640399,33.556307 C52.1640399,35.5455485 51.9232849,37.3062081 51.444357,38.8393922 C50.9648143,40.3728223 50.3449746,41.6006975 49.5845919,42.5256002 C48.8233486,43.4503799 47.8753296,44.2285916 46.7404118,44.8601125 C45.6052481,45.4921252 44.504759,45.9483056 43.4401742,46.2293914 C42.3750975,46.5104772 41.1758719,46.7217219 39.8420054,46.8621419 C41.0585683,47.9149226 41.6669728,49.5767225 41.6669728,51.846804 L41.6669728,59.2535257 C41.6669728,59.6742937 41.8132948,60.0255895 42.1061847,60.3063064 C42.3987058,60.5865315 42.8606653,60.6690374 43.492678,60.5516109 C48.922946,58.7498829 53.3521992,55.5026409 56.7806837,50.810008 C60.2087994,46.117744 61.923472,40.8347817 61.923472,34.9597686 C61.9222424,30.0695396 60.7162539,25.5590099 58.3067362,21.4281798 Z"
                      id="Shape"
                      fill="#FFFFFF"
                    ></path>
                  </g>
                </g>
              </svg>

              <span className="hidden md:block">Continue with Github</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
