import React from "react";
import Image from "next/image";
import RainImage from "../public/rain.png";
import SunnyImage from "../public/sunny.png";
import { useState, useEffect } from "react";
import { BsClipboardData } from "react-icons/bs";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
function ForeCast({ respdata, past_data }) {
  console.log({ past_data });

  const [showpastdata, setShowpastdata] = useState(true);
  console.log({ showpastdata });

  useEffect(() => {
    if (respdata) setShowpastdata(false);
  }, [respdata]);
  
  const toLocal =(time)=>{
    let local = new Date(time).toLocaleTimeString('en-US',{ hour: '2-digit', minute: '2-digit' })
    console.log(local);
    return local
  }
  return (
    <div className="block p-5 bg-white rounded-md shadow-md my-4 ">
      {!showpastdata ? (
        <div>
          <div className="flex justify-end">
            <buton
              className="text-lg font-medium cursor-pointer"
              onClick={() => setShowpastdata(!showpastdata)}
            >
              <BsClipboardData />
            </buton>
          </div>
          {respdata?.current_precip > 0 && (
            <div>
              <div className="my-4">
                <div className="flex justify-center items-center">
                  <div className="w-[200px] relative h-auto">
                    <Image src={RainImage} />
                  </div>
                </div>

                <h1 className="text-xl text-indigo-800 font-medium text-center">
                  It is raining outside{" "}
                </h1>
              </div>
              <hr />
              <div>
                <div className=" my-4 flex justify-center items-center">
                  <div className="p-2 rounded-md bg-indigo-300">
                    <h1 className="text-xl text-indigo-800 font-medium text-center">
                      Best Time to go outside
                    </h1>
                  </div>
                </div>
                <div className=" my-4 flex justify-center items-center">
                  <div className="p-2 rounded-md bg-indigo-200">
                    <h1 className="text-xl text-indigo-800 font-medium text-center">
                      { toLocal(respdata?.forecast_time)}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          {respdata?.current_precip == 0 && (
            <div>
              <div className="my-4">
                <div className="flex justify-center items-center">
                  <div className="w-[200px] relative h-auto">
                    <Image src={SunnyImage} />
                  </div>
                </div>

                <h1 className="text-xl text-teal-500 font-medium text-center">
                  It is a prefect weather{" "}
                </h1>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="block">
          <div>
            <h1 className="text-lg my-3">Past Checks</h1>
          </div>
          <div className="rounded-xl p-0">
            {past_data?.map((item, key) => {
              return (
                <div
                  className="p-2 border-2  border-blue-200 bg-blue-100 text-sm font-medium flex justify-between items-center"
                  key={key}
                >
                  <h1>{item.current_description}</h1>
                  <h1 className="text-xs">
                    {item?.startaddress}{" "}
                    <strong className="text-lg italic">To</strong>{" "}
                    {item?.endaddress}
                  </h1>
                  <ReactTimeAgo
                    date={item?.timestamp}
                    locale="en-US"
                    className="text-xs opacity-50 italic"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ForeCast;
