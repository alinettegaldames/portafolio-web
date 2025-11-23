// script.js
// Simple interactive logic for filters and rendering project cards

(function(){
  // Example projects with image, date and description for the modal
  const projects = [
    { title: 'Revista NODO', category: 'Editorial', img: 'https://picsum.photos/seed/nodo/900/700', date: 'Marzo 2024', desc: 'Proyecto editorial completo: maquetación, retícula y dirección de arte para la revista NODO.' },
    { title: 'Fanzine', category: 'Packaging', img: 'https://picsum.photos/seed/fanzine/900/700', date: 'Octubre 2023', desc: 'Fanzine experimental centrado en collage digital y técnicas mixtas para pequeño formato.' },
    { title: 'Ilustración N', category: 'Ilustración', img: 'https://picsum.photos/seed/illust/900/700', date: 'Enero 2025', desc: 'Serie de ilustraciones digitales con estilo minimalista y paleta futurista.' },
    { title: 'Sesión fotográfica', category: 'Fotografía', img: 'https://picsum.photos/seed/photo/900/700', date: 'Junio 2022', desc: 'Proyecto de fotografía conceptual para campaña de marca independiente.' },
    { title: 'Proyecto A', category: 'Editorial', img: 'https://picsum.photos/seed/a/900/700', date: 'Abril 2024', desc: 'Contenido editorial y diagramación para publicación local.' },
    { title: 'Proyecto B', category: 'Editorial', img: 'https://picsum.photos/seed/b/900/700', date: 'Mayo 2024', desc: 'Diseño visual y dirección fotográfica para editorial.' },
    { title: 'Proyecto C', category: 'Editorial', img: 'https://picsum.photos/seed/c/900/700', date: 'Julio 2024', desc: 'Propuesta experimental de portada y tipografía variable.' },
    { title: 'Proyecto D', category: 'Editorial', img: 'https://picsum.photos/seed/d/900/700', date: 'Septiembre 2024', desc: 'Proyecto colaborativo con diseñadores y fotógrafos locales.' }
  ]

  const grid = document.getElementById('projects-grid')
  const loadingEl = document.getElementById('projects-loading')
  const filterButtons = Array.from(document.querySelectorAll('.filters .filter'))

  // Render function: empties grid and creates project-card nodes
  function renderList(list){
    grid.innerHTML = ''
    list.forEach((p, idx) => {
      const card = document.createElement('div')
      card.className = 'project-card' + (idx === 0 ? ' large' : '')

      const thumb = document.createElement('div')
      thumb.className = 'thumb'
      // use background image for thumbnail if provided
      if(p.img){
        thumb.style.backgroundImage = `url(${p.img})`
        thumb.style.backgroundSize = 'cover'
        thumb.style.backgroundPosition = 'center'
      }

      const info = document.createElement('div')
      info.className = 'card-info'

      const tag = document.createElement('span')
      tag.className = 'tag'
      tag.textContent = p.category

      const strong = document.createElement('strong')
      strong.textContent = p.title

      const bar = document.createElement('div')
      bar.className = 'label-bar'

      info.appendChild(tag)
      info.appendChild(strong)
      info.appendChild(bar)

      card.appendChild(thumb)
      card.appendChild(info)

      // Open modal when clicking the card
      card.addEventListener('click', () => openModal(p))

      grid.appendChild(card)
    })
  }

  // Simulate loading and then render filtered list
  function applyFilter(filter){
    // UI: indicate active button
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter)
    })

    // Show loading
    grid.style.display = 'none'
    loadingEl.style.display = 'block'

    setTimeout(() => {
      const visible = projects.filter(p => p.category === filter)
      renderList(visible)
      // hide loading
      loadingEl.style.display = 'none'
      grid.style.display = 'grid'
      console.log('Proyectos cargados para', filter)
    }, 600)
  }

  // Attach click handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter)
    })
  })

  // Initial render (default: Packaging)
  document.addEventListener('DOMContentLoaded', () => {
    applyFilter('Packaging')
  })

  /* -----------------------
     Modal logic
     - populate and open modal when a project card is clicked
     ----------------------- */
  const modal = document.getElementById('modal')
  const modalImage = document.getElementById('modal-image')
  const modalTitle = document.getElementById('modal-title')
  const modalDate = document.getElementById('modal-date')
  const modalDesc = document.getElementById('modal-desc')
  const modalClose = document.getElementById('modal-close')

  function openModal(project){
    if(!project) return
    modalImage.src = project.img || ''
    modalTitle.textContent = project.title || ''
    modalDate.textContent = project.date || ''
    modalDesc.textContent = project.desc || ''
    modal.classList.add('open')
    modal.setAttribute('aria-hidden','false')
    document.body.style.overflow = 'hidden'
  }

  function closeModal(){
    modal.classList.remove('open')
    modal.setAttribute('aria-hidden','true')
    document.body.style.overflow = ''
  }

  // Close events
  modalClose.addEventListener('click', closeModal)
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal()
  })
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal()
  })

})();
