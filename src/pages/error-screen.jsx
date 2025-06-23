import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ErrorScreen = ({ code = 500 }) => {
  const data = {
    401: {
      title: "Unauthorized",
      subtitle:
        "We're sorry, but you do not have permission to access this page!",
    },
    404: {
      title: "Page Not Found",
      subtitle: "We're sorry, but the page you requested could not be found!",
    },
    500: {
      title: "Something Went Wrong",
      subtitle: "Please return to the homepage!",
    },
  };

  const { title, subtitle } = data[code];
  return (
    <>
      <div className="w-min-screen overflow-hidden">
        <div className="bg-errorPage flex items-center justify-center min-h-screen  bg-fixed bg-cover bg-bottom error-bg">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 offset-sm-2 text-center text-destructive -mt-52">
                <div className="relative ">
                  <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                    {code}
                  </h1>
                  <span className="absolute top-0 -ml-12  font-semibold">
                    Opp!
                  </span>
                </div>
                <h5 className="font-semibold -mr-10 -mt-2">{title}</h5>
                <p className="text-gray-700 mb-6 mt-5">{subtitle}</p>
                <Link
                  to="/"
                  className=" px-5 py-3 text-sm shadow-lg font-medium tracking-wider text-white border rounded-full hover:shadow-xl btn btn-sm bg-primary hover:bg-white hover:border-primary  hover:text-primary focus:outline-none transition duration-500 ease-in-out"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ErrorScreen.propTypes = {
  code: PropTypes.number,
};

export default ErrorScreen;
