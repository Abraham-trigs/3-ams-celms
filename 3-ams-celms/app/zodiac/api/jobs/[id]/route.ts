import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/server/services/job.service";
import { eventBus } from "@/server/events/eventBus";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();

    // ✅ MULTI-TENANT SAFETY (CRITICAL)
    const orgId = req.headers.get("x-org-id");
    if (!orgId) {
      return NextResponse.json(
        { error: "Missing org context" },
        { status: 401 },
      );
    }

    const updated = await jobService.update(params.id, {
      ...body,
      orgId,
    });

    // ✅ REALTIME EVENT (SERVER ORIGIN TAGGED)
    eventBus.publish({
      type: "job.updated",
      payload: updated,
      meta: {
        source: "server",
        orgId,
      },
    });

    // ✅ CONSISTENT RESPONSE SHAPE
    return NextResponse.json({
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
