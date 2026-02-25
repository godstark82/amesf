import Faq from "@/components/home/Faq";
import Aim from "@/components/home/Aim";
import Objective from "@/components/home/Objective";
import Association from "@/components/home/Association";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import ConferenceScheduleDownload from "@/components/home/ConferenceScheduleDownload";
import Overview from "@/components/home/Overview";
import ReviewProcessAndEthics from "@/components/home/ReviewProcessAndEthics";
import Tracks from "@/components/home/Tracks";
import ImportantDates from "@/components/home/ImportantDates";
import KeynoteSpeakers from "@/components/home/KeynoteSpeakers";
import Sponsors from "@/components/home/Sponsors";

const Home = () => {
    return (
        <>
            <Hero />
            <ConferenceScheduleDownload />
            {/* <MinisterSection /> */}
            <Overview />
            <ReviewProcessAndEthics />
            <Association />
            <Aim />
            <Objective />
            <Tracks />
            <ImportantDates />
            <KeynoteSpeakers />
            <Sponsors />
            {/* <Patners /> */}
            {/* <Highlights /> */}
            <Faq />
        </>
    )
}

export default Home;