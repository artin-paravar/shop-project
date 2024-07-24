import { useState } from "react";

import { useShoppingCart } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Search = () => {
  const [state, setstate] = useState("");
  const navigate = useNavigate();
  const { setinputData, Category, setcategory } = useShoppingCart();

  const handelsearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcategory("All");
    setinputData(state);

    if (state === "" && window.location.pathname != "/search/") {
      toast.error("type something");
    } else {
      navigate(`/search/?q=${state}&&category=${Category}`);
    }
    if (window.location.pathname == "/search/" && state === "") {
      navigate("/");
      toast.error(" type something for result");
    }
  };

  const handelonChange = (e: any) => {
    setstate(e.target.value);
  };
  // console.log(object);
  return (
    <form
      onSubmit={handelsearch}
      className="flex  ml-3 w-full sm:w-auto items-center  justify-center"
    >
      <input
        onChange={handelonChange}
        type="text"
        className="sm:w-auto w-full p-[6px] outline-none"
      />
      <button type="submit" className="text-white bg-blue-500  p-[6px]">
        search
      </button>
    </form>
  );
};
