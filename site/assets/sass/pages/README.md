# Pages

Put page specific styles in this folder. For example, the home page will have a file `index.scss` — note the lack of a leading underscore; this means the file is not a partial, and SCSS will compile it into a separate file.

Also, due to this separate compilation, we need to `@import` the util files again. Always start a new page file with `@import '../utils/*';`.