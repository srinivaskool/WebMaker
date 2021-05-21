import React, { useRef, useEffect, useState } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";
import TopNav from "./components/sections/TopNav";

import LayoutDefault from "./layouts/LayoutDefault";

import Home from "./views/Home";

ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

export const AppContext = React.createContext();

const App = () => {
  const [isEditable, setEditable] = useState(true);
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppContext.Provider value={{ isEditable, onclick: setEditable }}>
      <div>
        <TopNav />
        <ScrollReveal
          ref={childRef}
          children={() => (
            <Switch>
              <AppRoute
                exact
                path="/"
                component={Home}
                layout={LayoutDefault}
              />
            </Switch>
          )}
        />
      </div>
    </AppContext.Provider>
  );
};

export default App;
