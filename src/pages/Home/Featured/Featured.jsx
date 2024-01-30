import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './featured.css'


const Featured = () => {
    return (
        <div className="featured-item bg-fixed my-20 pt-8 text-white">
            <SectionTitle subHeading="Check it Out" heading="Featured Item"> </SectionTitle>
            <div className="md:flex justify-center bg-opacity-60 bg-slate-500 items-center pt-12 py-20 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2023</p>
                    <p className="uppercase">Where can i get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta quo eum in, consequuntur voluptas ex a mollitia tenetur nemo delectus nulla laudantium, architecto tempore similique. Atque nobis sequi perferendis quas.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>

                </div>
            </div>
        </div>
    );
};

export default Featured;