import Styles from "./footer.module.scss";
import Image from "next/image";

import { useContext } from "react";
import { ConnectionContext } from "../../../pages/_app";

const Footer = () => {
  const { connected, setConnected } = useContext(ConnectionContext);
  
  return (
    connected && <footer className={Styles.container}>
      <div className={Styles.container_left}>
        <Image height={50} width={140} src="/images/logo-w.svg" alt="Worka" />

        <div className={Styles.container_left_pad}>
          <div className={Styles.container_left_infos}>
            <svg className={Styles.container_left_infos_logo}>
              <use href="/images/sprite.svg#icon-location-pin"></use>
            </svg>
            <p className={Styles.container_left_infos_txt}>
              {" "}
              B13, 99861 Unique Tunnel, East Houston, Saudi Arabia, SA
            </p>
          </div>
          <div className={Styles.container_left_infos}>
            <svg className={Styles.container_left_infos_logo}>
              <use href="/images/sprite.svg#icon-mail"></use>
            </svg>
            <p className={Styles.container_left_infos_txt}>contact@worka.com</p>
          </div>
          <div className={Styles.container_left_infos}>
            <svg className={Styles.container_left_infos_logo}>
              <use href="/images/sprite.svg#icon-phone"></use>
            </svg>
            <p className={Styles.container_left_infos_txt}>
              (+966) 505 5586 12
            </p>
          </div>
        </div>

        <div className={Styles.container_left_media}>
          <p className={Styles.title}>Follow us on social media:</p>
          <div className={Styles.container_left_media_logos}>
            <div
              className={[
                Styles.container_left_media_logos_fb,
                Styles.container_left_media_logos_logo,
              ].join(" ")}
            >
              <svg className={Styles.container_left_media_logos_img}>
                <use href="/images/sprite.svg#icon-facebook"></use>
              </svg>
            </div>
            <div
              className={[
                Styles.container_left_media_logos_twi,
                Styles.container_left_media_logos_logo,
              ].join(" ")}
            >
              <svg className={Styles.container_left_media_logos_img}>
                <use href="/images/sprite.svg#icon-twitter"></use>
              </svg>
            </div>
            <div
              className={[
                Styles.container_left_media_logos_int,
                Styles.container_left_media_logos_logo,
              ].join(" ")}
            >
              <svg className={Styles.container_left_media_logos_img}>
                <use href="/images/sprite.svg#icon-instagram"></use>
              </svg>
            </div>
            <div
              className={[
                Styles.container_left_media_logos_lin,
                Styles.container_left_media_logos_logo,
              ].join(" ")}
            >
              <svg
                className={[
                  Styles.container_left_media_logos_img,
                  Styles.container_left_media_logos_logo,
                ].join(" ")}
              >
                <use href="/images/sprite.svg#icon-linkedinc"></use>
              </svg>
            </div>
            <div
              className={[
                Styles.container_left_media_logos_xing,
                Styles.container_left_media_logos_logo,
              ].join(" ")}
            >
              <svg className={Styles.container_left_media_logos_img}>
                <use href="/images/sprite.svg#icon-xing"></use>
              </svg>
            </div>
          </div>
        </div>

        <div className={Styles.container_left_rights}>
          <p>© All rights reserved for Worka 2021</p>
          <p>
            Made by{" "}
            <a
              className={Styles.container_left_rights_anc}
              href="https://innovant.studio"
            >
              innovant.studio
            </a>
          </p>
        </div>
      </div>

      <div className={Styles.container_right}>
        <div className={Styles.container_right_list}>
          <p className={Styles.title}>Discover Worka</p>
          <ul>
            <li className={Styles.container_right_list_item}>
              <a className={Styles.container_right_list_item_anc} href="/about">
                About
              </a>
            </li>
            <li className={Styles.container_right_list_item}>
              <a
                className={Styles.container_right_list_item_anc}
                href="/Philosophy"
              >
                Philosophy
              </a>
            </li>
            <li className={Styles.container_right_list_item}>
              <a
                className={Styles.container_right_list_item_anc}
                href="/How it works"
              >
                How it works
              </a>
            </li>
            <li className={Styles.container_right_list_item}>
              <a className={Styles.container_right_list_item_anc} href="/about">
                About
              </a>
            </li>
            <li className={Styles.container_right_list_item}>
              <a
                className={Styles.container_right_list_item_anc}
                href="/Philosophy"
              >
                Philosophy
              </a>
            </li>
            <li className={Styles.container_right_list_item}>
              <a
                className={Styles.container_right_list_item_anc}
                href="/How it works"
              >
                How it works
              </a>
            </li>
          </ul>
        </div>

        <div className={Styles.container_right_list}>
          <p className={Styles.title}>Legal</p>
          <ul>
            <li className={Styles.container_right_list_item}>
              <a
                className={Styles.container_right_list_item_anc}
                href="/privacy-policy"
              >
                Privacy policy
              </a>
            </li>
            <li className={Styles.container_right_list_item}>
              <a
                className={Styles.container_right_list_item_anc}
                href="/terms-and-conditions"
              >
                Terms and conditions
              </a>
            </li>
            <li className={Styles.container_right_list_item}>
              <a
                className={Styles.container_right_list_item_anc}
                href="/cookies"
              >
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
