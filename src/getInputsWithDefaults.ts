import { getInput } from "@actions/core/lib/core";

interface Inputs {
  base: string;
  head: string;
  draft?: boolean;
  title: string;
  body?: string;
}

export function getInputsWithDefaults(): Inputs {
  const head = getInput("head", { required: true });
  const title = getInput("title", { required: true });
  const base = getInput("base") || "master";
  const draft = getInput("draft") ? JSON.parse(getInput("draft")) : undefined;
  const body = getInput("body") || undefined;

  return {
    head,
    base,
    title,
    draft,
    body
  };
}
