import React, { useEffect, useState } from 'react'
import styles from './GuidelinesContent.module.scss'
import { introduction, introductionLines, sections, rounds, unansweredQuestions, prizes } from './content.js'
import { GuidelineSection, RuledList } from '../guideline-section/GuidelineSection.jsx'
import { JudgingRound } from '../judging-round/JudgingRound.jsx'
import { FaqAccordion } from '../faq-accordion/FaqAccordion.jsx'

function Label({ children }) { return <span className={styles.label}>{children}</span> }

const navigation = [...sections.map(({ id, title }) => ({ id, title })), { id: 'judging-process', title: 'Judging Process' }, { id: 'after-submission', title: 'After Submission' }]

export function GuidelinesContent() {
  const [activeSection, setActiveSection] = useState(navigation[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-5% 0px -55% 0px', threshold: 0 })
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.page} data-name="guidelines-content">
      <a href="#submission-process" className={styles.skipLink}>Skip to submission guide</a>
      <header className={styles.header}>
        <p className={styles.introText}>This page explains how to prepare<br />and submit work for the poster<br />contest. The first theme is<br /><u>Ownership</u>.</p>
        <h1 className={`${styles.headline} ${styles.introHeadline}`}>
          <span className={styles.introDesktop}>{introduction}</span>
          <span className={styles.introTablet}>{introductionLines.map((line, index) => <React.Fragment key={line}>{index > 0 && <br />}{line}</React.Fragment>)}</span>
        </h1>
      </header>
      <div className={styles.contentGrid}>
        <aside><div className={styles.stickyNavigation}><Label>Sections</Label><nav aria-label="Submission guide sections" className={styles.navigation}>{navigation.map(({ id, title }) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setActiveSection(id)} className={`${styles.navLink} ${activeSection === id ? styles.navLinkActive : styles.navLinkInactive}`}>{title}</a>)}</nav></div></aside>
        <div className={styles.contentSections}>
          {sections.map(section => <GuidelineSection key={section.id} id={section.id} title={section.title} description={section.description} items={section.items} ordered={section.id === 'submission-process'} />)}
          <section id="judging-process" className={styles.guideSection} aria-labelledby="judging-title">
            <h2 id="judging-title" className={styles.headline}>Judging Process</h2>
            <p>The competition review process takes place across four rounds. During each round, submitted posters are reviewed and either progress to the next stage or conclude their journey. Each round represents a different level of selection and feedback.</p>
            {rounds.map(round => <JudgingRound key={round.status} {...round} />)}
            <div className={styles.progressOverview}><h3 className={styles.bold}>Progress Overview</h3><p>Accepted (→) Under Review (→) Shortlisted (→) Selected</p></div>
          </section>
          <section id="after-submission" className={styles.guideSection} aria-labelledby="after-title"><h2 id="after-title" className={styles.headline}>After Submission</h2><p>After submitting, you should receive a confirmation message or email. Please do not close or exit the page while your submission is uploading.</p></section>
        </div>
      </div>
      <section className={styles.faqSection} aria-labelledby="faq-title"><h2 id="faq-title"><Label>FAQs</Label></h2><div className={styles.faqContent}>{unansweredQuestions.map(question => <FaqAccordion key={question} question={question} />)}<FaqAccordion question="What do I get if I win?" defaultOpen><p>Winning entries receive recognition across our channels and programme materials, with selected works becoming part of the broader exhibition experience.</p><ul className={styles.prizesList}>{prizes.map(prize => <li key={prize} className={styles.prizeItem}><span aria-hidden="true">•</span>{prize}</li>)}</ul></FaqAccordion></div></section>
    </section>
  )
}
