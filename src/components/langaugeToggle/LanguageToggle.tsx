// import { useTranslation } from "react-i18next";
// import Form from 'react-bootstrap/Form';
// import "./LanguageToggle.css";

// export default function LanguageToggle() {
//   const { i18n } = useTranslation();

//   const handleChange = (e) => {
//     i18n.changeLanguage(e.target.value);
//   };

//   return (
//     <Form.Select
//       style={{width: '110px'}}
//       value={i18n.language}
//       onChange={handleChange}
//     >
//       <option value="en">English</option>
//       <option value="es">Español</option>
//     </Form.Select>
//   );
// }


import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { WorldIcon } from "../../assets/icons/Icons";
import "./LanguageToggle.scss";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng:any) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
    <div className="lang_dropdown">
      <Dropdown align="end" className="language-dropdown">
        <Dropdown.Toggle
          id="language-dropdown"
          variant="light"
          className="language-toggle-btn"
        >
          <WorldIcon/>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            active={i18n.language === "en"}
            onClick={() => changeLanguage("en")}
          >
            🇺🇸 English
          </Dropdown.Item>

          <Dropdown.Item
            active={i18n.language === "es"}
            onClick={() => changeLanguage("es")}
          >
            🇪🇸 Español
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    </>
  );
}
