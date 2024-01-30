// import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useHooks";


const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')
    // const [menu, setMenu] = useState([])

    // useEffect( () => {
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(item => item.category === 'popular');
    //         setMenu(popularItems)})
        
    // },[])

    return (
        <section>
            <SectionTitle
        subHeading="From Our Menu"
        heading="Popular Items"></SectionTitle>

        <div className="grid grid-cols-2 gap-16 mb-20 mt-10">
            {
                popular.map(item => <MenuItem key={item._id} item={item}> </MenuItem>)
            }
        </div>
        <div className="flex justify-center items-center ">
            <button className="btn btn-outline border-0 border-b-4 mt-4 mx-auto">View Full Menu</button>
        </div>


        </section>
        
    );
};

export default PopularMenu;