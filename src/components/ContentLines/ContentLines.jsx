import React from "react";

// Fills `{name}` placeholders in a content string with values (strings or
// elements, e.g. a bold email address). Returns the string itself when there
// is nothing to fill.
export function fillContent(text, values) {
  if (!values || typeof text !== "string") return text;
  const parts = text.split(/\{(\w+)\}/);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index % 2 ? (
      <React.Fragment key={index}>{values[part]}</React.Fragment>
    ) : (
      part
    ),
  );
}

// Renders content copy from JSON: a string as is, an array of strings as lines
// joined with forced <br /> breaks (RevealText reads them as line breaks).
// `breakClassName` gives every break a class, e.g. one hidden above a
// breakpoint for per-breakpoint line breaks. `values` fills `{name}`
// placeholders (see fillContent).
export function contentLines(value, breakClassName, values) {
  if (!Array.isArray(value)) return fillContent(value, values);
  return value.map((line, index) => (
    <React.Fragment key={index}>
      {index > 0 && <br className={breakClassName} />}
      {fillContent(line, values)}
    </React.Fragment>
  ));
}
