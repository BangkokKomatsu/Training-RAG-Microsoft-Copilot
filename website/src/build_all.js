// Regenerates the whole website (all HTML pages) from source.
// Run with:  node src/build_all.js
require('./page_index.js').build();
require('./page_lab1.js').build();
require('./page_lab2.js').build();
require('./page_lab3.js').build();
require('./page_lab4.js').build();
require('./page_lab5.js').build();
require('./page_lab6.js').build();
require('./page_lab7.js').build();
console.log('\n✅ Build complete — 8 files written to ../ (website root)');
