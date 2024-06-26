import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader/Loader";
import 'bootstrap/dist/css/bootstrap.min.css';

function TopBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
  setSelectedCountry, // Функция для обновления selectedCountry
}) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Порог для мобильных устройств
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      // Дополнительные настройки для других порогов медиа-запросов
    ]
  };


  const urlParams = new URLSearchParams(window.location.search);
  const brandValue = urlParams.get("brand");

  const apiOld =
    "https://bonusnumber1.com/api/brands/read.php";
  const apiNew =
    "https://bonusnumber1.com/api/brands/read2.php";
    const api1043 =
    "https://bonusnumber1.com/api/brands/read3.php";
    const api1044 =
    "https://bonusnumber1.com/api/brands/read4.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Создаем копию массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  console.log("============", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
    const fetchData = async () => {
      setIsLoading(true);
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
          // const dataArray = Object.values(responseData.brands);
          let filteredData = [];
          console.log("respons3dData", responseData.brands)
          if (geo) {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Sandbox"
            );
          } else {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Sandbox"
            );
          }

          console.log("filtered", filteredData)

          const topData = responseData.brands
            .filter((rowData) => rowData.Tech === brandValue)
            .map((item) => ({
              ...item,
              clas: "topbrand",
            }));

          // Фильтрация объектов в массиве data
          const filteredDataWithTopData = filteredData.filter((dataItem) => {
            // Проверка, есть ли объект с таким же Casino brand в topData
            const existsInTopData = topData.some(
              (topDataItem) =>
                topDataItem["CasinoBrand"] === dataItem["CasinoBrand"]
            );

            // Возвращаем true только для объектов, которые не совпадают
            return !existsInTopData;
          });

          // Перемешиваем данные перед отображением
          setData(shuffleArray(filteredDataWithTopData));

          setTopData([...topData]);
          setIsLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          if (filteredDataWithTopData.length === 0) {
            setSelectedCountry("all");
            console.log(filteredDataWithTopData);
          }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if ((geo && currentLanguage) || (!geo && ipDataCode && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, brandValue, currentLanguage, selectedCountry, source]);



  const combinedData = [...topData, ...data];
  console.log("combined", combinedData);
















  return (
    <div>
    {isLoading && <Loader />}
    <section className="features py-5 mt-lg-5" id="features">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 text-center">
            <p
              className="mb-3 theme-text-secondary fs-4 fw-bold mt"
              data-aos="fade-up"
            >
             {t("Monster-Sized Bonuses")}
            </p>
            <h2 className="display-5 mb-3 font-black max" data-aos="fade-up">
            {t("Dare to Win Big")}
            </h2>
           
          </div>
        </div>
        <div className="row mt-5" data-aos="fade-up">
          {data.length > 2 && topData ? (
            <Slider
              className="owl-carousel owl-theme"
              {...settings}
              id="carouselfeatures"
            >
        
              {topData ? (
                topData.map((rowData, index) => (
                  <div key={index} className={`item ${rowData.clas}`}>
                    <div className="theme-border-radius theme-border mb-4 theme-transparent-bg py-5 text-center">
                      <figure className="mb-3 icon-bg">
                        <img
                          src={rowData["LinkImg"]}
                          alt={rowData["LinkImg"]}
                          className="img-fluid"
                        />
                      </figure>
                      <h3 className="fs-5 fw-bold theme-text-secondary">
                        {rowData["CasinoBrand"]}
                      </h3>
                      <p className="mb-0 px-3">
                        {rowData["OurOfferContent"]}
                      </p>
                      <a
                      target="_blank"
                        className="rounded-pill btn custom-btn-primary font-small primary-btn-effect mt-4"
                        href={rowData["GoBig"] + newUrl + "L_monster-jackpot_1"}
                      >
                        {t("Play Now")}
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <li>{t("No matching data found.")}</li>
              )}

              {data.map((rowData, index) => (
                <div key={index} className={`item ${rowData.clas}`}>
                  <div className="theme-border-radius theme-border mb-4 theme-transparent-bg py-5 text-center">
                    <figure className="mb-3 icon-bg">
                      <a href={rowData["GoBig"] + newUrl + "L_monster-jackpot_1"}>

                      <img
                        src={rowData["LinkImg"]}
                        alt={rowData["LinkImg"]}
                        className="img-fluid"
                      />
                      </a>
                    </figure>
                    <h3 className="fs-5 fw-bold theme-text-secondary">
                      {rowData["CasinoBrand"]}
                    </h3>
                    <p className="mb-0 px-3">{rowData["OurOfferContent"]}</p>
                    <a
                    target="_blank"
                        className="rounded-pill btn custom-btn-primary font-small primary-btn-effect mt-4"
                        href={rowData["GoBig"] + newUrl + "L_monster-jackpot_1"}
                      >
                        {t("Play Now")}
                      </a>
                  </div>
                </div>
              ))}
           
           </Slider>
          ) : null}
        </div>
      </div>
    </section>
    </div>
  );
}

export default TopBrands;
