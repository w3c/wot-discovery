/**
 * Script for rendering the Discovery ontology as an HTML document.
 */

import { readFileSync, writeFileSync } from "fs";
import sttl from "sttl";
import { load, query, loadFrom, clear } from "urdf";

async function obtainDataViaTemplate(template) {
  sttl.register(template);
  const data = await sttl.applyTemplates();
  return data;
}

async function obtainPriorVersionUrl() {
  return obtainDataViaTemplate(
    `
    template {
      str(?priorVersion)
    } where {
      ?in a <http://www.w3.org/2002/07/owl#Ontology> ;
          <http://www.w3.org/2002/07/owl#priorVersion> ?priorVersion
    }
    `
  );
}

async function obtainChangeLogEntry() {
  return obtainDataViaTemplate(
    `
    template {
      "<dt>"
        str(?versionInfo)
      "</dt>"
      "<dd>"
        str(?changes)
      "</dt>"
    } where {
      ?in a <http://www.w3.org/2002/07/owl#Ontology> ;
          <http://www.w3.org/2002/07/owl#versionInfo> ?versionInfo ;
          <http://purl.org/vocab/vann/changes> ?changes .
    }
    `
  );
}

async function loadPriorVersion(priorVersion) {
  // TODO: Remove file links
  if (priorVersion.startsWith("file://")) {
    const priorVersionPath = priorVersion.substring("file://".length);
    const ontology = readFileSync(priorVersionPath, "utf-8");
    await load(ontology);
  } else {
    await loadFrom(priorVersion);
  }
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

  await reset({ fullReset: true });

  const currentOntology = readTtlFile("context/discovery-ontology.ttl");
  await load(currentOntology);
  let priorVersionUrl = await obtainPriorVersionUrl();

  await reset();

  while (priorVersionUrl != null && priorVersionUrl.length > 0) {
    await loadPriorVersion(priorVersionUrl);

    const nextChangeLogEntry = await obtainChangeLogEntry();
    changeLog.push(nextChangeLogEntry);

    await reset({ fullReset: true });

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
