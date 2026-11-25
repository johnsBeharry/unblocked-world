import React, { useEffect, useLayoutEffect } from "react";
import styles from "./App.module.scss";
import { Header, HEADER_COLORS } from "./components/header/Header.jsx";
import { HomePage } from "./pages/home/HomePage.jsx";
import { PostersPage } from "./pages/posters/PostersPage.jsx";
import { GuidelinesPage } from "./pages/guidelines/GuidelinesPage.jsx";
import { SubmitPage } from "./pages/submit/SubmitPage.jsx";
import { ClientStaticPreviewPage } from "./pages/client-static-preview/ClientStaticPreviewPage.jsx";
import { GrantsPage } from "./pages/grants/GrantsPage.jsx";
import { CultureGrantsPage } from "./pages/culture-grants/CultureGrantsPage.jsx";
import { OpenSystemsPage } from "./pages/open-systems/OpenSystemsPage.jsx";
import { SmoothScroll } from "./components/smooth-scroll/SmoothScroll.jsx";
import { PageCurtain } from "./components/page-curtain/PageCurtain.jsx";
import { NotFoundPage } from "./pages/not-found/NotFoundPage.jsx";

const toPath = (url) => url.split("?")[0].replace(/\/$/, "") || "/";

// Client routes; any other path renders the 404 page. A new route also needs
// an entry in seo/seo-content.json, a vercel.json rewrite to its generated
// <route>/index.html and a curtain colour (curtainColors.js, index.html).
const PAGES = {
  "/": () => <HomePage />,
  "/posters": () => <PostersPage />,
  "/guidelines": () => <GuidelinesPage />,
  "/client-static": () => <ClientStaticPreviewPage />,
  "/grants": () => <GrantsPage />,
  "/grants/culture-grants": () => <CultureGrantsPage />,
  "/grants/open-systems": () => <OpenSystemsPage />,
  "/submit": () => <SubmitPage />,
  "/submit/form/consent": () => <SubmitPage initialStep={4} />,
};

export const isKnownPath = (url) => Object.hasOwn(PAGES, toPath(url));

export function App({ url = "/" }) {
  const path = toPath(url);
  const isStandalonePreview = path === "/client-static";

  // Static boot cover from index.html bridges page loads; children (incl. the
  // curtain) are already in the DOM here, so removing it never flashes.
  useLayoutEffect(() => {
    document.getElementById("boot-cover")?.remove();
  }, []);

  // PageCurtain owns the page phase (loading → content); the standalone
  // preview has no curtain, so it enters the content phase directly.
  useEffect(() => {
    if (!isStandalonePreview) return undefined;
    document.body.dataset.pagePhase = "content";
    return () => {
      delete document.body.dataset.pagePhase;
    };
  }, [isStandalonePreview]);

  const page = PAGES[path]?.() ?? <NotFoundPage />;
  const headerColor =
    path === "/posters"
      ? HEADER_COLORS.poster
      : path === "/guidelines"
        ? HEADER_COLORS.guidelines
        : HEADER_COLORS.home;

  return (
    <div className={styles.app} data-route={path}>
      {!isStandalonePreview && <SmoothScroll />}
      {!isStandalonePreview && <PageCurtain />}
      {!path.startsWith("/submit") && !isStandalonePreview && (
        <Header color={headerColor} />
      )}
      <div>{page}</div>
    </div>
  );
}
