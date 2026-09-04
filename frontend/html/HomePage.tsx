export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">HTML + CSS + TypeScript</p>
        <h1 id="page-title">A tiny Next.js page.</h1>
        <p className="intro">
          The route in <code>app/page.tsx</code> calls this TSX view. This markup gets styled by
          <code>css/globals.css</code> and deployed by Next.js on Vercel.
        </p>
        <a className="button" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
          Read the Next.js docs
        </a>
      </section>
      <section className="connection" aria-labelledby="connection-title">
        <p className="eyebrow">The connection</p>
        <h2 id="connection-title">Three small files, one page</h2>
        <ol>
          <li>
            <strong>TypeScript:</strong> the route calls the view.
          </li>
          <li>
            <strong>TSX:</strong> the view returns semantic HTML.
          </li>
          <li>
            <strong>CSS:</strong> the global stylesheet gives it shape and color.
          </li>
        </ol>
      </section>
    </main>
  )
}
