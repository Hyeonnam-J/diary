import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from "../fragments/Header";
import Nav from "../fragments/Nav";

import '../../stylesheets/common/common.css';
import '../../stylesheets/common/layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const [isNavOpen, setNavOpen] = useState(false);

  const receiveNavClick = () => {
    setNavOpen(prevState => !prevState);  // setNavOpen(!isNavOpen);
  };

  const navWidth = 'var(--nav-contents-width)'
  const navWidthMinus = 'var(--nav-contents-width-minus)'

  return (
    <div className='container'>
      {/* 헤더는 종속 없이 늘 그자리에. 속성 absolute. */}
      <Header />

      {/* nav-contents html 요소를 Nav.tsx에서 제어하기에는 코드가 복잡해짐
      DefaultLayout에 html 요소를 넣고 display 요소를 제어하는 것이 간편 */}
      <div id='nav-contents-box' style={{ left: isNavOpen ? '0' : navWidthMinus }}>
        <h4 id='nav-greetings'>Welcome</h4>
        <ul id='nav-contents'>
          <li><Link to="/Menu1">Menu1</Link></li>
          <li><Link to="/Menu2">Menu2</Link></li>
          <li><Link to="/Menu3">Menu3</Link></li>
          <li><Link to="/Menu4">Menu4</Link></li>
        </ul>
      </div>

      {/* <main style={{ marginLeft: isNavOpen ? navWidth : '0' }}> */}
      <main style={{ left: isNavOpen ? navWidth : '0' }}>
        
        {/* nav는 상대적 위치로 종속. */}
        <Nav navClick={receiveNavClick} />

        {props.children}

      </main>

    </div>
  );
}

export default Layout;