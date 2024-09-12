import "../../Styles/footer.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
export default function Header() {
  return (
    <div>
      <div className="footer-box">
        <div className="footer-column">
          Para cualquier duda o sugerencia, no dudes en contactar con nosotros por
          medio del correo: prediccionescool@gmail.com o marque al numero 5511223344
        </div>
        <div className="footer-about">Our socials:</div>
        <div className="footer-foot">
          Facebook: PrediccionesCool<br />
          Instagram: @PrediccionesCool
        </div>
        <AutoAwesomeIcon className="stars-icon"></AutoAwesomeIcon>
      </div>
    </div>
  );
}
