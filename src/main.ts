import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://zk.me" target="_blank">
      <img src="/zkme.svg" class="logo" alt="zkMe logo" />
    </a>
    <h1>zkMe Chain Storage SDK for JavaScript</h1>
    <p class="read-the-docs">
      Click on the zkMe logo to learn more
    </p>
  </div>
`
