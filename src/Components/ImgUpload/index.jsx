import React, { useState } from "react";
import PropTypes from "prop-types";
import Img from "../../assets/images/no-image-found-360x250.png";
import { AddPhotoAlternate } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import Label from "../Label/index.jsx";
import { useStyles } from "./styles";
import clsx from "clsx";
// import { width } from "dom-helpers";

/**
 * Component to img. Use the funciton imgUpload if you send in request.
 * Formik is required
 */
// const img2 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAEHUlEQVR4AezBgQAAAACAoP2pF6kCAAAAAGB27QG6tTYBw+hKUv62bdu2bdu2bdu2bV7btm07bb7ZYwRzbpvkKs9au+Z72jh6MXJUKsGyrMcerFuXhddiL3ZgPZZayJavYl325Dyeoxn9uJEqIlfOjfSjI9/xAtdzNJuxJOUL0IgJlmBTTuFBvqMvU5lDIPArGxC5pfiAwD+lmMlAmvEht3I4G7IsZfPhSMuzLRfxBk0ZQZKQxUiOJEaktqA5IYcUUxhKW17jXHZh9Xk83lJsxVm8QzfGUUOIYBaPsySROoahBKKaw2R68TE3cyirFmm8BKtyHE/RiokkCXXQhLX5v8W4llmEephNf77iSjZnCWLkszircCqfMZRaQj0N4hBi5GwZXiBFyIMUE2jLI+xMJflocfbnXYZTS8iTadxNBTnbgJ8JBTCLlpzO4tS1GGtxEz1IEgrgG1YhZzvTk1AgKfpycR1Hq2IvPmA8oYA6szs5O7rgPwj04wwqidoynEd7koQCm8DZZK2S65hOKLAUbdiTGABxEuBlaRVuZxApQhHUcB+VuY7gi8wmFEGSd9mOYzmX87iG2//hQvbhOcYRiijFR6xGxlbhZ1KEIhnDHwxgFKOZxIx/GEsvphGKjRZsQcY2oguhiFLUEuZTPdiJjO3LQEIJ0IddSCvBmYwmlADd2JG0yrmVKYQSoD3bkFYVL5AklABN2Yy0luBTAqEE+In1SWtlfiKURLsctgGNCCVAihdYhrS2pAWhBEhxH+WktR1tCCVAkuvI2KY0JRRZkpGMYSaz/4mpDGM4cwhFNpnzyNiyfEoooil8wQkcyZlcxY1cwakcwkn8xmxCEQ3lWHLeFzmZUGApBnAvGxDnnyWoIME/i7MLXzODUCRd2Yus7U5fQgHNpAEnsxRRi2sLXonFYuMI/Ovr/vN17/8bLwP1vNC6OVlbhW+pJeRZLYN4im0pY64zxmpGuJFeJEkbK4+Dfc/KZK2Km5lByKMp/MwJLEe9MsLiHMqXTCjgYO+yGDk7kCGEPJhDV+5mY8rIS4ZIsA7X0IwZeR5sDo9TQc7W40dCPSQZyAvsyxIUJINUGmg77qUd00jl6Q6QK6Ic5GoeoIYwl2oZxvscxvIUJSMtwfbcYsQm3jSaWkId9WMvInUKowgR1TCQjzmZlYlT9AxWbbD1vXgWb9OOiaQIRNWA1YnUljQn5JBkMu15iiNZiTjzQ3GWZkfO50VaM47pJPP56J0leSvDUZnDaDrzLuezHUszPxdjWbbiCG7gXVrTn5FMZjaBSZxGgkiVcTnjmEA3fuNFzmRzlqecBbEqlmdtduNUbuQp3uUVNiFyMTblas5nH9aimgQLW3HKqaSaKuLMVTFYlCv1l/bgWAAAAABgkL/1NHZUAAAAAACsBJqa1R3k05fHAAAAAElFTkSuQmCC`;
const ImgUpload = ({
  name,
  category,
  formik,
  base64 = null,
  showButton = true,
  status = "",
  showDivOpacity = false,
}) => {
  const classes = useStyles();
  const [show, setShow] = useState(showDivOpacity);
  const handleUploadClick = (event) => {
    event.currentTarget.files &&
      (document.getElementById(`${name}/img`).src = window.URL.createObjectURL(
        event.currentTarget.files[0]
      ));
    event.currentTarget.files[0].category = category;
    // comentado, verificar qual o problema
    //formik.setFieldValue(`${name}`, event.currentTarget.files[0]);
    setShow(false);
  };

  let labelStatus = "";

  const objStatus = {
    reprovado: "disapproved",
    aprovado: "approved",
    aguarandoaprovacao: "waitApproved",
  };

  if (status === null) {
    status = "";
  } else if (status === "Aguardando Aprovação") {
    status = "aguarandoAprovacao";
    labelStatus = "Aguardando Aprovação";
  } else {
    labelStatus = status;
  }

  // console.log(width("body"));
  return (
    <div className={classes.container}>
      {show && (
        <div className={classes.divOpacity}>
          <Label color={objStatus[status.toLocaleLowerCase()]}>
            {labelStatus.toLocaleUpperCase()}
          </Label>
        </div>
      )}
      <div className={classes.img}>
        <img
          id={`${name}/img`}
          src={!base64 ? Img : base64}
          alt="Imagem carregada"
          className={classes.imgUpload}
        />

        <input
          name={name}
          accept="image/png, image/jpeg"
          className={classes.input}
          id={`${name}`}
          multiple
          type="file"
          onChange={handleUploadClick}
        />
        {showButton && (
          <label htmlFor={`${name}`}>
            <Fab
              component="span"
              className={(classes.button, classes.positionBtnUpload)}
            >
              <AddPhotoAlternate />
            </Fab>
          </label>
        )}
      </div>
    </div>
  );
};

ImgUpload.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};

export default ImgUpload;
