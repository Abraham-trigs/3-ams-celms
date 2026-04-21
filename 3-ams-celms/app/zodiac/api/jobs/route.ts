import { NextRequest, NextResponse } from "next/server";
import { JobService } from "@/server/services/job.service";
import { eventBus } from "@/server/events/eventBus";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const orgId = searchParams.get("orgId");
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("perPage") || 20);

  if (!orgId) {
    return NextResponse.json({ error: "orgId is required" }, { status: 400 });
  }

  const data = await JobService.loadJobs(orgId);

  return NextResponse.json({
    data,
    meta: { page, perPage },
  });
}

// POST

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orgId = req.headers.get("x-org-id");
    if (!orgId) {
      return NextResponse.json(
        { error: "Missing org context" },
        { status: 401 },
      );
    }

    const job = await JobService.createJob({
      ...body,
      orgId,
    });

    eventBus.publish({
      type: "job.created",
      payload: job,
      meta: {
        source: "server",
        orgId,
      },
    });

    return NextResponse.json({ data: job }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
