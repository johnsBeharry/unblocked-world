import React from 'react'
import styles from './SubmissionSuccessPanel.module.scss'

function SuccessPattern() {
  return (
    <svg className={styles.pattern} viewBox="0 0 187 187" aria-hidden="true">
      <g clipPath="url(#success-clip)">
        <path d="M137.2 70.6464 79.3557 128.492 51.2637 100.399l8.0136-8.0139 20.0784 20.0779 49.8303-49.8302 8.0139 8.0136Z" />
        <path d="m149.222 70.6527-69.866 69.8673-40.1138-40.115 20.0355-20.0355 20.0784 20.0795 49.8303-49.8318 20.0356 20.0355Z" />
        <path d="m161.246 70.651-81.8877 81.889-52.1356-52.1376 32.0573-32.0574 20.0783 20.0784 49.8307-49.8306 32.057 32.0572Z" />
        <path d="m173.27 70.6573-93.9094 93.9107-64.1575-64.1581 44.0792-44.0795 20.0783 20.0797 49.8304-49.832 44.079 44.0792Z" />
        <path d="m185.291 70.6557-105.932 105.933-76.1793-76.1803 56.1009-56.101 20.0784 20.0783 49.8309-49.8306 56.1011 56.1006Z" />
        <path d="m197.315 70.654-117.9537 117.955-88.2011-88.203 68.1228-68.1235 20.0783 20.0798 49.8307-49.832 68.123 68.1237Z" />
        <path d="m209.339 70.6524-129.9754 129.9766-100.223  -100.224 80.1447-80.1449 20.0783 20.0783 49.8304-49.8306 80.1449 80.145Z" />
        <path d="m221.361 70.6586-141.997 141.9984-112.2449-112.246 92.1665-92.1665 20.0784 20.0798 49.8306-49.8319 92.1664 92.1662Z" />
        <path d="m233.385 70.657-154.0187 154.02-124.2667-124.268 104.1883-104.1879 20.0784 20.0784 49.8303-49.8306 104.1884 104.1881Z" />
        <path d="m245.409 70.6633-166.0404 166.0417-136.288  -136.289 116.2096-116.2106 20.0784 20.0798 49.8304-49.832 116.21 116.2101Z" />
        <path d="m257.43 70.6616-178.063 178.0644-148.309-148.312 128.231-128.232 20.078 20.0783 49.831-49.8306 128.232 128.232Z" />
        <path d="m269.454 70.6678-190.0848 190.0862-160.3311-160.334 140.2527-140.2537 20.0784 20.0798 49.8308-49.832 140.254 140.2537Z" />
        <path d="m281.478 70.6663-202.1064 202.1077-172.3539-172.3556 152.2755-152.2765 20.0784 20.0784 49.8304-49.8307 152.276 152.2767Z" />
        <path d="m293.5 70.6646-214.1281 214.1294-184.3759-184.3776 164.2976-164.2985 20.0783 20.0797 49.8309-49.832 164.2972 164.299Z" />
      </g>
      <defs>
        <clipPath id="success-clip"><rect width="187" height="187" /></clipPath>
      </defs>
    </svg>
  )
}

export function SubmissionSuccessPanel({ onExplore }) {
  return (
    <section className={styles.panel} aria-labelledby="submission-success-title">
      <div className={styles.inner}>
        <SuccessPattern />
        <div className={styles.message}>
          <h1 id="submission-success-title">Entry Submitted</h1>
          <p>Thank you for your submission. Your work has<br />been received and is now under review. We'll<br />keep you informed of any updates as the<br />selection process progresses.</p>
          <button className={styles.explore} type="button" onClick={onExplore}>Explore More (→)</button>
        </div>
      </div>
    </section>
  )
}
