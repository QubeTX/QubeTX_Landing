import React from 'react'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import CustomCursor from './components/effects/CustomCursor'
import styles from './styles/App.module.css'

function App() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Hero />
          <Features />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <CustomCursor />
    </>
  )
}

export default App