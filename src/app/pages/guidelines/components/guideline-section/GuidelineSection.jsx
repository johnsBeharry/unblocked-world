import React from 'react'
import styles from './GuidelineSection.module.scss'

export function RuledList({ items, ordered = false, className = '' }) {
  const ListTag = ordered ? 'ol' : 'ul'

  return (
    <ListTag className={`${styles.ruledList} ${ordered ? styles.ordered : styles.unordered} ${className}`}>
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className={`${styles.ruledListItem} ${ordered ? styles.orderedItem : ''}`}>
          {ordered && <span className={styles.listMarker} aria-hidden="true">{index + 1}.</span>}
          <span className={styles.listText}>{item}</span>
        </li>
      ))}
    </ListTag>
  )
}

export function GuidelineSection({ id, title, description, items, ordered = false, className = '' }) {
  return (
    <section id={id} className={`${styles.section} ${description ? styles.withDescription : ''} ${ordered ? styles.submissionProcess : ''} ${className}`} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      <RuledList items={items} ordered={ordered} />
    </section>
  )
}
