import BaseMeta from '../components/BaseMeta'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <BaseMeta title="Isaac &quot;Yak&quot; Litzenberger&apos;s Portfolio - isaacyakl.com" desc="Isaac &quot;Yak&quot; Litzenberger&apos;s Portfolio"></BaseMeta>
      <header>
        <h1 style={{ textAlign: 'left' }}>
          Isaac<br/>
          Litzenberger
        </h1>
        <hr/>
        <div>
          <strong>Location:</strong> San Francisco Bay Area<br/>
          <strong>Seeking:</strong> Frontend Dev Position
        </div>
        <div className="social-media-icons"></div>
      </header>

      <main role="main">
        <h2>About</h2>
        <div id="years-of-experience"></div>
        <p>
          I focus on delivering value through usability, maintainability, and integrity. My aim is to gain experience at a company with modern web architecture and global impact.
        </p>
        <h2>Skills</h2>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
        <h2>Experience</h2>
        <div id="experienced"></div>
      </main>

      <footer>
       
      </footer>
    </>
  )
}
