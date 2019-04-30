import React from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import Temp from "./Temp";
import marked from "marked";

marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a target="_blank" href="${href}" title="${title}">${text}</a>`;

const placeholder = `# a header (H1 size)
## a sub header (H2 size)
[a link, ](https://www.google.com)
inline \`code\`,
\`\`\`
a code block,
\`\`\`
+ a
 + list
1. item
> a blockquote
![an image,](https://i.redd.it/12jpr36ajst11.png)
**and bolded text.**`;

const App = () => {
  const [text, changeText] = useState(placeholder);

  return (
    <>
      <textarea value={text} onChange={e => changeText(e.target.value)} id="editor" />
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: marked(text, { renderer }) }}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
