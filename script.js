document.getElementById('year').textContent = new Date().getFullYear();

const conceptProducts = [
  {
    title: 'Aurora Drop Necklace',
    image: 'product-01.png',
    description: 'A luminous teardrop pendant concept exploring refined symmetry, warm gold architecture and a crystal-like focal form within Kristi\'s futuristic visual language.'
  },
  {
    title: 'Orbit Ring',
    image: 'product-02.png',
    description: 'A sculptural ring concept inspired by orbital movement, combining polished gold geometry with a futuristic sense of balance and motion.'
  },
  {
    title: 'Lumina Earrings',
    image: 'product-03.png',
    description: 'A drop-earring concept built around light, vertical elegance and high-contrast gold detailing for a sleek future-luxury silhouette.'
  },
  {
    title: 'Infinity Bracelet',
    image: 'product-04.png',
    description: 'An architectural bracelet concept that translates continuous form and structured gold surfaces into a bold Kristi statement piece.'
  },
  {
    title: 'Kristi Tiara',
    image: 'product-05.png',
    description: 'A ceremonial headpiece concept blending regal jewelry language with futuristic structure, designed as a visual study rather than a finished product.'
  },
  {
    title: 'Humanoid Circuit Pendant',
    image: 'product-06.png',
    description: 'A youth-oriented pendant concept where electronic circuitry and humanoid form meet gold jewelry language, exploring technology as personal ornament.'
  },
  {
    title: 'Chip Core Necklace',
    image: 'product-07.png',
    description: 'A necklace concept built around a recognizable microchip form, reframed with gold contact points and a luxury presentation while preserving its technological identity.'
  },
  {
    title: 'Chip Signature Brooch',
    image: 'product-08.png',
    description: 'A brooch concept based on the visual language of a microchip, transformed into a distinctive gold statement accessory for a future-facing collection.'
  }
];

const modal = document.getElementById('conceptModal');
const modalImage = document.getElementById('conceptImage');
const modalTitle = document.getElementById('conceptTitle');
const modalDescription = document.getElementById('conceptDescription');

function openConcept(index) {
  const product = conceptProducts[index];
  if (!product || !modal) return;

  modalImage.src = product.image;
  modalImage.alt = `${product.title} concept preview`;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeConcept() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.product-card').forEach((card) => {
  const button = card.querySelector('.concept-button');
  if (!button) return;
  button.addEventListener('click', () => openConcept(Number(card.dataset.product)));
});

document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeConcept);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
    closeConcept();
  }
});
