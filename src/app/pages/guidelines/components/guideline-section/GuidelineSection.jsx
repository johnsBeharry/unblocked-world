import React from 'react'
import styles from './GuidelineSection.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function RuledList({ items, ordered = false, className = '' }) {
  const ListTag = ordered ? 'ol' : 'ul'

  return (
    <ListTag className={`${styles.ruledList} ${ordered ? styles.ordered : styles.unordered} ${className}`}>
      {items.map((item, index) => {
        const text = typeof item === 'string' ? item : item.text
        const content = typeof item === 'string' || !item.href
          ? text
          : <a href={item.href}>{text}</a>

        return (
          <li key={`${index}-${text}`} className={`${styles.ruledListItem} ${ordered ? styles.orderedItem : ''}`}>
            {ordered && <span className={styles.listMarker} aria-hidden="true">{index + 1}.</span>}
            <span className={styles.listText}>{content}</span>
          </li>
        )
      })}
    </ListTag>
  )
}

export function GuidelineSection({ id, title, description, items, ordered = false, className = '' }) {
  return (
    <section id={id} className={`${styles.section} ${description ? styles.withDescription : ''} ${ordered ? styles.submissionProcess : ''} ${className}`} aria-labelledby={`${id}-title`}>
      <RevealText as="h2" id={`${id}-title`}>{title}</RevealText>
      {description && <RevealText as="p" className={styles.description}>{description}</RevealText>}
      <RuledList items={items} ordered={ordered} />
    </section>
  )
}
