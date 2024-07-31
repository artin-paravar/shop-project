import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type Host = {
  host: string;
};
export const ListItem = ({ host }: Host) => {
  const [list, setlist] = useState<any>([]);
  const fetchlist = async () => {
    const res = await axios.get(`${host}/api/shopitem/list`);
    if (res.data) {
      setlist(res.data.items);
    } else {
      toast.error("Error");
    }
  };
  const removefood = async (itemid: string) => {
    console.log(itemid);
    const res = await axios.post(`${host}/api/shopitem/remove`, {
      id: itemid,
    });
    await fetchlist();
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error("error");
    }
  };
  useEffect(() => {
    fetchlist();
  }, []);
  return (
    <div>
      {list.length > 0 ? <p>All item</p> : <p>there is no item</p>}
      {list.map((item: any) => {
        return (
          <>
            <div
              className="flex bg-black text-white p-4
            "
            >
              <div className="flex  h-[200px] gap-5 ">
                <img
                  className="w-[200px]  object-contain"
                  src={`${host}/images/` + item.image}
                  alt=""
                />
                <div className="flex flex-col gap-5 w-full">
                  <p>${item.price}</p>
                  <p>title : {item.title}</p>
                  <p>category:{item.category}</p>
                  <b
                    className="cursor-pointer"
                    onClick={() => removefood(item._id)}
                  >
                    delete item
                  </b>
                </div>
              </div>
            </div>
            <hr className="m-6" />
          </>
        );
      })}
    </div>
  );
};
