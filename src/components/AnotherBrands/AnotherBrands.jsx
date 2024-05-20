import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import di from "../../../public/hero-pic.svg";
import di2 from "../../../public/hero-pic2.svg";
import di3 from "../../../public/hero-pic.png";

// import fwb from "../../images/fwb.png";

function AnotherBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  };

  const apiOld = "https://pickbonus.myawardwallet.com/api/brands/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brands/read2.php";
  const api1043 = "https://pickbonus.myawardwallet.com/api/brands/read3.php";
  const api1044 = "https://pickbonus.myawardwallet.com/api/brands/read4.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

    const fetchData = async () => {
      try {
        let url;
        switch (source) {
          case "partner1039":
            url = apiNew; // Для partner1039
            break;
          case "partner1043":
            url = api1043; // Для partner1043
            break;
          case "partner1044":
            url = api1044; // Для partner1044
            break;
          default:
            url = apiOld; // Для всех остальных случаев
        }

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData);

          let filteredDataOther = [];

          if (geo) {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Premium"
            );
          } else {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["Current Status"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Premium"
            );
          }

          // Перемешиваем данные перед отображением
          setOtherData(shuffleArray(filteredDataOther));
          setLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          // if (filteredDataOther.length === 0) {
          //   setSelectedCountry("all");
          // }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    if ((ipDataCode && currentLanguage) || (geo && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, currentLanguage, selectedCountry, source]);

  // ...

  return (
    <section className="hero" id="home">
      <div className="bg">
        <div className="container pt-5">
          <div className="row">
            <div className="shape-wrap">
              <img
                src={`.${di2}`}
                className="obj-1"
                alt="Background Shape Dollor"
              />
              <img
                src={`.${di}`}
                className="obj-2"
                alt="Background Shape Bitcoin"
              />
            </div>
            <div
              className="col-12 text-center position-relative"
              data-aos="fade-up"
            >
              <h1 className="display-4 mb-3 theme-text-white font-black max">
                {t(
                  "Claim Your Fantasy Bonuses Before the Monsters Swipe Them Away!"
                )}
              </h1>

              <div className="group mt-5">
                {otherData ? (
                  otherData.slice(0, 1).map((rowData, index) => (
                    <a
                      key={index}
                      target="_blank"
                      className="rounded-pill btn custom-btn-primary font-small primary-btn-effect px-5 fs-4 mb-2 wfff"
                      href={
                        rowData["GoBig"] + newUrl + "L_monster-jackpot_random"
                      }
                    >
                      {t("Get Bonuses Now")}
                      <i className="bi bi-apple ms-2"></i>
                    </a>
                  ))
                ) : (
                  <li>{t("")}</li>
                )}
              </div>
              <figure className="mb-0 hero-image">
                <img src={`.${di3}`} className="img-fluid " alt="hero image" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnotherBrands;
