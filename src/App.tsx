import type { FC } from 'react'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import CustomCursor from './components/effects/CustomCursor'
import styles from './styles/App.module.css'
import { CONTACT_CTA, FEATURES, HERO_CONTENT, PROJECTS } from './data/content'

const App: FC = () => {
  return (
    <>
      <div id="top" className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Hero content={HERO_CONTENT} />
          <Features items={FEATURES} />
          <Projects items={PROJECTS} />
          <Contact cta={CONTACT_CTA} />
        </main>
        <Footer />
      </div>
      <CustomCursor />
    </>
  )
}

export default App
