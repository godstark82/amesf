import Faq from "@/components/home/Faq";
import Aim from "@/components/home/Aim";
import Objective from "@/components/home/Objective";
import Association from "@/components/home/Association";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import Overview from "@/components/home/Overview";
import Tracks from "@/components/home/Tracks";
import ImportantDates from "@/components/home/ImportantDates";
import KeynoteSpeakers from "@/components/home/KeynoteSpeakers";

const Home = () => {
    return (
        <>
            <Hero />
            {/* <MinisterSection /> */}
            <Overview />
            <Association />
            <Aim />
            <Objective />
            <Tracks />
            <ImportantDates />
            <KeynoteSpeakers />
            {/* <Patners /> */}
            {/* <Highlights /> */}
            <Faq />
        </>
    )
}

export default Home;