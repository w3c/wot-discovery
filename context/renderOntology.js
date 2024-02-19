/**
 * Script for rendering the Discovery ontology as an HTML document.
 */

import { readFileSync, writeFileSync } from "fs";
import sttl from "sttl";
import { load, query, clear } from "urdf";

async function obtainOntologyMetaData(termIri) {
  const template = `
    template {
      str(?value)
    } where {
    ?in a <http://www.w3.org/2002/07/owl#Ontology> ;
        <${termIri}> ?value
    }
  `;

  sttl.register(template);
  const data = await sttl.applyTemplates();
  return data;
}

async function obtainPriorVersionUrl() {
  return obtainOntologyMetaData("http://www.w3.org/2002/07/owl#priorVersion");
}

async function obtainVersionInfo() {
  return obtainOntologyMetaData("http://www.w3.org/2002/07/owl#versionInfo");
}

async function obtainChanges(options) {
  const changes = await obtainOntologyMetaData(
    "http://purl.org/vocab/vann/changes"
  );

  if (changes.length === 0 && options?.useDefault === true) {
    return "Initial version";
  }

  return changes;
}

async function obtainChangeLogEntry(options) {
  const versionInfo = await obtainVersionInfo();
  await reset();

  const changes = await obtainChanges(options);
  await reset({ fullReset: true });

  return `<dd>${versionInfo}</dd><dt>${changes}</dt>`;
}

async function loadPriorVersion(priorVersion) {
  const response = await fetch(priorVersion);
  const ontology = await response.text();
  await load(ontology);
}

async function reset(parameters) {
  if (parameters?.fullReset === true) {
    await clear();
  }

  sttl.clear();
}

function readTtlFile(filePath) {
  return readFileSync(filePath, "utf-8");
}

async function obtainChangeLog() {
  const changeLog = [];

  const changeLogEntry = await obtainChangeLogEntry();
  changeLog.push(changeLogEntry);

  const currentOntology = readTtlFile("context/discovery-ontology.ttl");
  await load(currentOntology);
  let priorVersionUrl = await obtainPriorVersionUrl();

  await reset({ fullReset: true });

  while (priorVersionUrl != null && priorVersionUrl.length > 0) {
    await loadPriorVersion(priorVersionUrl);

    const changeLogEntry = await obtainChangeLogEntry({ useDefault: true });
    changeLog.push(changeLogEntry);

    await loadPriorVersion(priorVersionUrl);

    priorVersionUrl = await obtainPriorVersionUrl();
    await reset();
  }

  return changeLog;
}

const ontology = readTtlFile("context/discovery-ontology.ttl");
await load(ontology);

const sparqlTemplate = readTtlFile("context/template.sparql");
sttl.register(sparqlTemplate);

sttl.connect(async (sparqlQuery) => {
  const bindings = await query(sparqlQuery);
  return {
    results: {
      bindings,
    },
  };
});

let renderedOntology = await sttl.callTemplate(
  "https://github.com/w3c/wot-discovery/ontology#main",
  {
    value: "discovery",
    type: "literal",
  }
);

const changeLog = await obtainChangeLog();

renderedOntology = renderedOntology.replace(
  "%s",
  changeLog.join("\n                ")
);

writeFileSync("context/discovery-ontology.html", renderedOntology);
