import { useState, useEffect, useRef, useContext } from "react";

import { LoginContext } from "@/context/LoginContext";

import { useRouter } from "next/router";

import { base_url } from "@/api/url";

import axios from "axios";

import styles from "./_otp.module.scss";

const OTP = ({ userData }) => {
  const [code, setCode] = useState(Array(5).fill(""));
  const [error, setError] = useState(false);
  const [time, setTime] = useState(120);
  const [hurry, setHurry] = useState(false);

  const timeContent = useRef(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(countdown);
      }

      if (time <= 10) {
        setHurry((hurry) => (hurry = true));
        timeContent.current.style.color = "red";
      }

      if (time === 0) {
        setHurry((hurry) => (hurry = false));
        timeContent.current.style.color = "#8e8e8e80";
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [time]);

  const handleChange = (element, pos) => {
    if (element.target.value.length <= 1) {
      let newCode = [...code];
      newCode[pos] = element.target.value;
      setCode(newCode);
      setError(false);

      if (element.target.value.length === 1) {
        if (pos !== 4) {
          document.getElementById(`code${pos + 2}`).focus();
        }
      }
    }
  };
  const handleKeyDown = (element, pos) => {
    if (element.key === "Backspace") {
      let newCode = [...code];
      newCode[pos] = "";
      setCode(newCode);

      if (pos !== 0) {
        document.getElementById(`code${pos}`).focus();
      }
    }
  };

  const { phone, password } = userData;
  const { token, setToken } = useContext(LoginContext);

  const router = useRouter();

  const handleLoginVerify = () => {
    if (code.join("").length < 5) {
      setError(true);
    } else {
      axios
        .post(`${base_url}/loginVerify`, {
          verification_code_sms: code.join(""),
          password: password,
          phone: phone,
        })
        .then((response) => {
          const userToken = response.data.authorisation.token;
          setToken(userToken);
          setTime(() => {
            router.push("/dashboard");
          }, 1000);
        })
        .catch((message) => {
          console.error(message);
        });
    }
  };

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <div className={styles.container}>
      <label htmlFor={`code1`}>کد پیامک شده</label>
      <div className={styles.digitsContainer}>
        {code.map((value, index) => (
          <input
            type="text"
            id={`code${index + 1}`}
            value={value}
            onChange={(element) => handleChange(element, index)}
            onKeyDown={(element) => handleKeyDown(element, index)}
            maxLength="1"
            key={index}
            inputMode="numeric"
            className={` ${styles.digits} ${error ? `${styles.error}` : ""}`}
          />
        ))}
      </div>
      <div className={styles.row}>
        <button onClick={handleLoginVerify}>تایید</button>
        <div className={styles.timer}>
          <h3 ref={timeContent} className={hurry ? styles.hurry : ""}>
            {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
            {time % 60}
          </h3>
          <div className={styles.progressBar}>
            <div className={styles.bar}> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
