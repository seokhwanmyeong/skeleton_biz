const resetTheme = {
  html: {
    fontSize: "16px",
    fontFamily: "Roboto, sans-serif",
    lineHeight: 1,
  },
  "html, body, figure, figcaption, footer, header, div, span, applet, object, iframe, fieldset, form, label, legend, dl, dt, dd, ol, ul, li, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas":
    {
      margin: 0,
      padding: 0,
      border: 0,
      fontSize: "100%",
      font: "inherit",
      verticalAlign: "baseline",
    },
  textarea: {
    resize: "none",
  },
  a: {
    textDecoration: "none",
    outline: "none",
    _hover: {
      textDecoration: "none",
    },
    _active: {
      textDecoration: "none",
    },
  },
  "ol, ul": {
    listStyle: "none",
  },
  "blockquote, q": {
    quotes: "none",
  },
  "blockquote:before, blockquote:after, q:before, q:after": {
    content: "none",
  },
  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
  },
};

export default resetTheme;
