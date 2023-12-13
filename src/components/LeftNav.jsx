import React, { useContext } from "react";
import { categories } from "../utils/constants";
import LeftNavMenuItem from "./LeftNavMenuItem";
import { context } from "../context/contextApi";
import { useNavigate } from "react-router-dom";

const LeftNav = () => {
  const { selectCategories, setSelectCategories, mobileView } =
    useContext(context);

  const navigate = useNavigate();
  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectCategories(name);

      case "home":
        return setSelectCategories(name);
      case "menu":
        return false;

      default:
        break;
    }
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
        mobileView ? "translate-x-3" : ""
      }`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <div key={item.name}>
              <LeftNavMenuItem
                key={item.name}
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
                className={`${
                  selectCategories === item.name ? "bg-white/[0.15]" : ""
                }`}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </div>
          );
        })}
        ;
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white text-[12px] font-semibold">
          Clone by: Rajan Kumar Singh
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
