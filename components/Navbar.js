import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  let { pathname } = useRouter();
  const [activePage, setActivePage] = useState(
    pathname === '/'
      ? 0
      : pathname === '/deaths'
      ? 1
      : pathname === '/rescue'
      ? 2
      : 3
  );

  useEffect(() => {
    setActivePage(
      pathname === '/'
        ? 0
        : pathname === '/deaths'
        ? 1
        : pathname === '/rescue'
        ? 2
        : 3
    );
  }, [pathname]);

  const activeStyle = {
    background: '#f00',
    color: '#000',
  };
  const inactiveStyle = {
    background: '#000',
    color: '#f00',
  };

  return (
    <div id="navbar">
      <h1 id="navbarHeader">
        <span>nway</span>
        <span id="sy">စာရင်း</span>
      </h1>
      <div id="linkContainer">
        <Link href="/">
          <a
            id="linkLoss"
            className="link"
            style={activePage === 0 ? activeStyle : inactiveStyle}
          >
            Loss
          </a>
        </Link>
        <Link href="/deaths">
          <a
            id="linkDeaths"
            className="link"
            style={activePage === 1 ? activeStyle : inactiveStyle}
          >
            Deaths
          </a>
        </Link>
        <Link href="/rescue">
          <a
            id="linkRescue"
            className="link"
            style={activePage === 2 ? activeStyle : inactiveStyle}
          >
            Rescue
          </a>
        </Link>
        <Link href="/other">
          <a
            id="linkOther"
            className="link"
            style={activePage === 3 ? activeStyle : inactiveStyle}
          >
            Other
          </a>
        </Link>
      </div>

      <style jsx>
        {`
          #navbar {
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            width: 100%;
            height: 45px;
            backdrop-filter: blur(2px);
            background: rgba(200, 0, 0, 0.8);
            z-index: 1;
          }

          #navbarHeader {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            height: 35px;
            line-height: 18.5px;
            color: #000;
            margin-left: 5px;
            border: 2px solid #000;
            background: #f00;
            padding: 2px;
          }

          #navbarHeader::before {
            content: '';
            position: absolute;
            top: 23px;
            left: 5px;
            width: 45px;
            height: 18.5px;
            background: #000;
          }

          span {
            font-size: 17px;
            color: #000;
            z-index: 1;
          }

          #sy {
            display: block;
            font-size: 10px;
            font-family: Myanmar3, Yunghkio;
            color: #f00;
          }

          #linkContainer {
            display: flex;
            width: 240px;
            background: #111;
            align-items: center;
            justify-content: center;
            border: 3px solid #000;
            border-radius: 25px;
            margin-left: 15px;
          }

          .link {
            width: 60px;
            height: 25px;
            font-size: 12px;
            font-weight: bold;
            line-height: 24px;
            text-align: center;
            text-decoration: none;
            transition: 0.5s;
            outline: none;
          }

          #linkLoss {
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
          }

          #linkOther {
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;
