import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/server/services/job.service";
import { eventBus } from "@/server/events/eventBus";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const orgId = searchParams.get("orgId");
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("perPage") || 20);

  if (!orgId) {
    return NextResponse.json({ error: "orgId is required" }, { status: 400 });
  }

  const data = await jobService.list(orgId, { page, perPage });

  return NextResponse.json({
    data,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ MULTI-TENANT SAFETY
    const orgId = req.headers.get("x-org-id");
    if (!orgId) {
      return NextResponse.json(
        { error: "Missing org context" },
        { status: 401 },
      );
    }

    const job = await jobService.create({
      ...body,
      orgId,
    });

    // ✅ REALTIME EVENT
    eventBus.publish({
      type: "job.created",
      payload: job,
      meta: {
        source: "server",
        orgId,
      },
    });

    return NextResponse.json(
      {
        data: job,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
