import { NextRequest, NextResponse } from "next/server";
import { staffService } from "@/server/services/staff.service";
import { eventBus } from "@/server/events/eventBus";

export async function GET(req: NextRequest) {
  try {
    // ✅ MULTI-TENANT CONTEXT
    const orgId = new URL(req.url).searchParams.get("orgId");

    if (!orgId) {
      return NextResponse.json({ error: "orgId is required" }, { status: 400 });
    }

    const data = await staffService.list(orgId);

    return NextResponse.json({
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
