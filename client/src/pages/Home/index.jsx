import MainContent from "../../components/MainContent";
import SideBar from "../../components/SideBar";
import "./home.scss";

const Home = () => {
    return (
        <>
            <div className="ui-box">
                <SideBar />
                <MainContent />
            </div>
        </>
    );
};

export default Home;
