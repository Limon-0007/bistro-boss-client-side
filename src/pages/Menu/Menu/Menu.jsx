import React from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/menu-bg.png";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="our menu"></Cover>
      {/* main cover */}
      <SectionTitle
        subHeading="Don't Miss"
        heading="Today's Offer"
      ></SectionTitle>
      {/* offered menu items */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory
        items={desserts.slice(0, 6)}
        title="dessert"
        coverImg={dessertImg}
      ></MenuCategory>
      {/* pizza menu items */}
      <MenuCategory
        items={pizza.slice(0, 6)}
        title="pizza"
        coverImg={pizzaImg}
      ></MenuCategory>
      {/* salads menu items */}
      <MenuCategory
        items={salad.slice(0, 6)}
        title="salad"
        coverImg={saladImg}
      ></MenuCategory>
      {/* soups menu items */}
      <MenuCategory
        items={soup.slice(0, 6)}
        title="soup"
        coverImg={soupImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
