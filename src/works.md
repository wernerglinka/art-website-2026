---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

topMessage:
  disable: true
  text: ''
  link:
    url: ''
    label: ''
  dismissible: true

navigation:
  navLabel: 'Works'
  navIndex: 0

seo:
  title: 'Werner Glinka - Mixed Media Works'
  description: 'Mixed media assemblages by Werner Glinka, using found and discarded materials.'
  socialImage: '/assets/images/artworks/2004.04.003.jpg'
  canonicalURL: ''

sections:
  - sectionType: image-grid
    containerTag: section
    classes: 'first-section'
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    artworks:
      source: 'works'
      imageFolder: artworks/thumbnails
    text:
      title: 'Works'
      titleTag: 'h1'
    settings:
      gap: '50'
      targetRowHeight: '300'
---
