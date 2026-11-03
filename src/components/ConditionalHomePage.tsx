import { User } from '../types';
import HomePage from '../pages/HomePage';
import FarmerDashboard from '../pages/FarmerDashboard';
import VendorDashboard from '../pages/VendorDashboard';

interface ConditionalHomePageProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const ConditionalHomePage = ({ user, setUser }: ConditionalHomePageProps) => {
  // If user is logged in, show their dashboard
  if (user) {
    if (user.role === 'farmer') {
      return <FarmerDashboard user={user} />;
    } else if (user.role === 'vendor') {
      return <VendorDashboard user={user} />;
    }
  }
  
  // If no user is logged in, show the public home page
  return <HomePage />;
};

export default ConditionalHomePage;
