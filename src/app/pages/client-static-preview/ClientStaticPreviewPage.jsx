import styles from './ClientStaticPreviewPage.module.scss'

export function ClientStaticPreviewPage() {
  return (
    <main className={styles.root} aria-label="Client static form preview">
      <iframe
        className={styles.frame}
        src="/form/test?v=posters"
        title="Client static poster submission form"
      />
    </main>
  )
}
