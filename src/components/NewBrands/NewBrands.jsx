import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

// import all from "../../all.png";

import allEn from "../../all_en.png";
import allPl from "../../all_pl.png";
import allEs from "../../all_es.png";
import allAll from "../../all_all.png";
import allBe from "../../all_be.png";
import allBg from "../../all_bg.png";
import allCz from "../../all_cz.png";
import allDe from "../../all_de.png";
import allDk from "../../all_dk.png";
import allFi from "../../all_fi.png";
import allFr from "../../all_fr.png";
import allGr from "../../all_gr.png";
import allHu from "../../all_hu.png";
import allIt from "../../all_it.png";
import allNl from "../../all_nl.png";
import allNo from "../../all_no.png";
import allPt from "../../all_pt.png";
import allSe from "../../all_se.png";
import allSk from "../../all_sk.png";
import allTr from "../../all_tr.png";

function NewBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
  setSelectedCountry, // Функция для обновления selectedCountryzz
}) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const brandValue = urlParams.get("brand");

  const apiOld = "https://bonusnumber1.com/api/brands/read.php";
  const apiNew = "https://bonusnumber1.com/api/brands/read2.php";
  const api1043 = "https://bonusnumber1.com/api/brands/read3.php";
  const api1044 = "https://bonusnumber1.com/api/brands/read4.php";

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
          // const dataArray = Object.values(responseData);

          let filteredData = [];

          if (geo) {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["Casino brand"] !== "Mirax (FS)" &&
                rowData["Casino brand"] !== "Katsubet (FS)" &&
                rowData["Casino brand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
            );
          } else {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["Casino brand"] !== "Mirax (FS)" &&
                rowData["Casino brand"] !== "Katsubet (FS)" &&
                rowData["Casino brand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
            );
          }

          // Фильтрация объектов в массиве data
          const filteredDataWithTopData = filteredData.filter((dataItem) => {
            // Проверка, есть ли объект с таким же Casino brand в topData
            const existsInTopData = topData.some(
              (topDataItem) =>
                topDataItem["Casino brand"] === dataItem["Casino brand"]
            );

            // Возвращаем true только для объектов, которые не совпадают
            return !existsInTopData;
          });

          // Перемешиваем данные перед отображением
          setData(shuffleArray(filteredDataWithTopData));
          setTopData([...topData]);
          setIsLoading(false);
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
  }, [ipDataCode, currentLanguage, selectedCountry, source]);

  const combinedData = [...topData, ...data];

  const allImages = {
    en: allEn,
    pl: allPl,
    es: allEs,
    all: allAll,
    be: allBe,
    bg: allBg,
    cz: allCz,
    de: allDe,
    dk: allDk,
    fi: allFi,
    fr: allFr,
    gr: allGr,
    hu: allHu,
    it: allIt,
    nl: allNl,
    no: allNo,
    pt: allPt,
    se: allSe,
    sk: allSk,
    tr: allTr,
    // Добавьте другие языки по необходимости
  };

  const allImageSrc = allImages[currentLanguage] || allImages.en;

  return (
    <section className="games py-5 theme-transparent-bg" id="games">
      {data.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1
                  className="display-5 mb-3 theme-text-white font-black max"
                  data-aos="fade-up"
                >
                  {t("Mike Wazowski would approve it")}
                </h1>
              </div>
              <div className="row mt-5">
                {data ? (
                  data.slice(0, 6).map((rowData, index) => (
                    <div
                      className="col-12 col-md-6 col-lg-2"
                      data-aos="fade-up"
                      key={index}
                    >
                      <div className="game-card theme-border-radius theme-bg-white text-center py-4 mb-4">
                        <figure className="mb-0 icon-bg">
                          <a
                            href={
                              rowData["GoBig"] + newUrl + "L_monster-jackpot_2"
                            }
                          >
                            <img
                              src={rowData["LinkImg"]}
                              alt={rowData["LinkImg"]}
                              className="img-fluid rounded-circle"
                            />
                          </a>
                        </figure>
                        <h3 className="h5 fw-bold theme-text-primary mb-0 mt-3">
                          {rowData["OurOfferContent"]}
                        </h3>
                        <a
                          target="_blank"
                          className="rounded-pill btn custom-btn-primary font-small primary-btn-effect mt-3"
                          href={
                            rowData["GoBig"] + newUrl + "L_monster-jackpot_2"
                          }
                        >
                          {t("Play Now")}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{t("No matching data found.")}</p>
                )}
              </div>
              <div className="row mt-5">
                <div className="col-12 text-center bbn">
                  <a
                    href={`https://topbon.us/${newUrl}`}
                    className="rounded-pill btn custom-btn-primary primary-btn-effect bbn"
                    target="_blank"
                  >
                    {t("More Offers")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default NewBrands;
