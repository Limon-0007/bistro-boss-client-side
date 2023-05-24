import React, { useState } from "react";
import orderImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../Hooks/useMenu";
import FoodCard from "../../Shared/FoodCard/FoodCard";

const Order = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
      <Cover img={orderImg} title="Our Shop"></Cover>
      {/* react tabs */}
      <div className="text-center mt-20 mb-10 px-8 font-semibold">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soup</Tab>
            <Tab>Dessert</Tab>
            <Tab>Drinks</Tab>
          </TabList>
          {/* tab panel */}
          {/* salad */}
          <TabPanel>
            <div className="grid md:grid-cols-3 gap-4">
              {salad.map((items) => (
                <FoodCard items={items} key={items._id}></FoodCard>
              ))}
            </div>
          </TabPanel>
          {/* pizza */}
          <TabPanel>
            <div className="grid md:grid-cols-3 gap-4">
              {pizza.map((items) => (
                <FoodCard items={items} key={items._id}></FoodCard>
              ))}
            </div>
          </TabPanel>
          {/* soup */}
          <TabPanel>
            <div className="grid md:grid-cols-3 gap-4">
              {soup.map((items) => (
                <FoodCard items={items} key={items._id}></FoodCard>
              ))}
            </div>
          </TabPanel>
          {/* desserts */}
          <TabPanel>
            <div className="grid md:grid-cols-3 gap-4">
              {desserts.map((items) => (
                <FoodCard items={items} key={items._id}></FoodCard>
              ))}
            </div>
          </TabPanel>
          {/* drinks */}
          <TabPanel>
            <div className="grid md:grid-cols-3 gap-4">
              {drinks.map((items) => (
                <FoodCard items={items} key={items._id}></FoodCard>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
