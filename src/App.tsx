import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Membership from './pages/Membership';
import ForBusiness from './pages/ForBusiness';
import EverydayCare from './pages/services/EverydayCare';
import DelicatesDryClean from './pages/services/DelicatesDryClean';
import HomeCare from './pages/services/HomeCare';
import SpecialtyServices from './pages/services/SpecialtyServices';
import AddOnServices from './pages/services/AddOnServices';
import HotelsHospitality from './pages/business/HotelsHospitality';
import RestaurantsCafes from './pages/business/RestaurantsCafes';
import CorporateOffices from './pages/business/CorporateOffices';
import GovernmentEmbassy from './pages/business/GovernmentEmbassy';
import SpaWellness from './pages/business/SpaWellness';
import SchoolsColleges from './pages/business/SchoolsColleges';
import PartnersDropOff from './pages/business/PartnersDropOff';
import RequestQuote from './pages/business/RequestQuote';
import About from './pages/info/About';
import Contact from './pages/info/Contact';
import Gallery from './pages/info/Gallery';
import Blog from './pages/info/Blog';
import Partnerships from './pages/info/Partnerships';
import FAQs from './pages/info/FAQs';
import Terms from './pages/info/Terms';
import Privacy from './pages/info/Privacy';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';
import UploadVideos from './pages/UploadVideos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/everyday-care" element={<EverydayCare />} />
          <Route path="services/delicates-dry-clean" element={<DelicatesDryClean />} />
          <Route path="services/home-care" element={<HomeCare />} />
          <Route path="services/specialty-services" element={<SpecialtyServices />} />
          <Route path="services/add-on-services" element={<AddOnServices />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="membership" element={<Membership />} />
          <Route path="business" element={<ForBusiness />} />
          <Route path="business/hotels-hospitality" element={<HotelsHospitality />} />
          <Route path="business/restaurants-cafes" element={<RestaurantsCafes />} />
          <Route path="business/corporate-offices" element={<CorporateOffices />} />
          <Route path="business/government-embassy" element={<GovernmentEmbassy />} />
          <Route path="business/spa-wellness" element={<SpaWellness />} />
          <Route path="business/schools-colleges" element={<SchoolsColleges />} />
          <Route path="business/partners-drop-off" element={<PartnersDropOff />} />
          <Route path="business/request-quote" element={<RequestQuote />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blog" element={<Blog />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="coming-soon" element={<ComingSoon />} />
          <Route path="upload-videos" element={<UploadVideos />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
