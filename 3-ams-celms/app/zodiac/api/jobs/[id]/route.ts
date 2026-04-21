import { NextRequest, NextResponse } from "next/server";
import { JobService } from "@zodiac/services/job.service";
import { eventBus } from "@/server/events/eventBus";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const orgId = req.headers.get("x-org-id");

    if (!orgId) {
      return NextResponse.json(
        { error: "Missing org context" },
        { status: 401 },
      );
    }

    const updated = await JobService.updateStatus(
      orgId,
      params.id,
      body.status,
    );

    eventBus.publish({
      type: "job.updated",
      payload: updated,
      meta: {
        source: "server",
        orgId,
      },
    });

    return NextResponse.json({
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
