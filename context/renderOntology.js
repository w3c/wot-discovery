/**
 * Script for rendering the Discovery ontology as an HTML document.
 */

import { readFileSync, writeFileSync } from "fs";
import sttl from "sttl";
import { load, query } from "urdf";

const ontology = readFileSync("context/discovery-ontology.ttl", "utf-8");
await load(ontology);

const sparqlTemplate = readFileSync("context/template.sparql", "utf-8");
await sttl.register(sparqlTemplate);

sttl.connect(async (sparqlQuery) => {
  const bindings = await query(sparqlQuery);
  return {
    results: {
      bindings,
    },
  };
});

const renderedOntology = await sttl.callTemplate("https://github.com/w3c/wot-discovery/ontology#main",
  {
    value: "discovery",
    type: "literal",
  });

writeFileSync("context/discovery-ontology.html", renderedOntology)
