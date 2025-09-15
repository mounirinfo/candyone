import { NextResponse } from "next/server";

export function ok(data: unknown, init?: number | ResponseInit) {
  return NextResponse.json(data, typeof init === "number" ? { status: init } : init);
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function serverError(message: string) {
  return NextResponse.json({ error: message }, { status: 500 });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export type Query = {
  select?: string;
  order?: string;
  limit?: string;
  offset?: string;
  [k: string]: string | undefined;
};

export function parseOrder(order?: string) {
  if (!order) return null;
  const [column, directionRaw, nullsRaw] = order.split(".");
  const ascending = (directionRaw ?? "asc").toLowerCase() === "asc";
  const nullsFirst = (nullsRaw ?? "").toLowerCase() === "nullsfirst";
  const nullsLast = (nullsRaw ?? "").toLowerCase() === "nullslast";
  return { column, ascending, nullsFirst, nullsLast };
}
