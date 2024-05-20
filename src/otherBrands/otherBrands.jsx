import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

function OtherBrands({
  newUrl,
  ipData,
  ipDataCode,
  currentLanguage,
  country,
  source,
  selectedCountry,
  setSelectedCountry,
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
        const url = source === "partner1039" ? apiNew : apiOld;

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
                rowData.Segment2 !== "Premium" &&
                rowData.Segment2 !== "Sandbox"
            );
          } else {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData.Segment2 !== "Premium" &&
                rowData.Segment2 !== "Sandbox"
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
    <div>
  {otherData.length > 0 && (
    <section className="more-game py-5" id="offers">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p
              className="mt-5 mb-3 theme-text-secondary fs-4 fw-bold"
              data-aos="fade-up"
            >
              Discover various tourneys to win from
            </p>
            <h2 className="display-5 mb-3 font-black max" data-aos="fade-up">
              Multiple Gaming Prize
            </h2>
            <p className="mb-0" data-aos="fade-up">
              Explore multiple options for maximum fun Use the power of mind
            </p>
          </div>
        </div>
        <div className="row mt-5">
          {otherData.length > 0 ? (
            otherData.slice(0, 4).map((rowData, index) => (
              <div
                className="col-12 col-md-6 col-lg-3"
                data-aos="fade-up"
                key={index}
              >
                <div
                  className="more-game-card theme-border-radius theme-border mb-4 theme-bg-white py-5 text-center"
                >
                  <figure className="mb-5 icon-bg">
                    <img
                      src={rowData["LinkImg"]}
                      className="img-fluid rounded-circle"
                      alt={rowData["LinkImg"]}
                    />
                  </figure>

                  <h5 className="theme-text-accent-one fw-bold">
                    {rowData["OurOfferContent"]}
                  </h5>
                  <h3 className="theme-text-primary fw-bold">
                    {rowData["CasinoBrand"]}
                  </h3>
                  <a
                    className="rounded-pill btn custom-btn-primary font-small primary-btn-effect"
                    href={rowData["GoBig"] + newUrl}
                  >
                    Play Now
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="ti">No brands available for your country</p>
          )}
        </div>
      </div>
    </section>
  )}
</div>
  );
}

export default OtherBrands;
