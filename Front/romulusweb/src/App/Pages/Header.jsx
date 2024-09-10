import "../../Styles/header.css";
import MenuIcon from '@mui/icons-material/Menu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
export default function Header() {
  return (
    <div>
      <div className="header-box">
        <MenuIcon />
        <h1>Reserva de Viaje</h1>
        <h2>Acerca de</h2>
        <TravelExploreIcon className="space-icon" />
        </div>
    </div>
  );
}
