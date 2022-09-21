import Head from "next/head";
import Nav from "./nav/nav";
import Footer from "./footer/footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Worka</title>

        {/* <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        /> */}
      </Head>

      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
