import { NextRequest, NextResponse } from "next/server";
import { deliveryService } from "@/server/services/delivery.service";
import { eventBus } from "@/server/events/eventBus";

export async function GET(req: NextRequest) {
  const orgId = new URL(req.url).searchParams.get("orgId");

  if (!orgId) {
    return NextResponse.json({ error: "orgId is required" }, { status: 400 });
  }

  const data = await deliveryService.list(orgId);

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

    const delivery = await deliveryService.create({
      ...body,
      orgId,
    });

    // ✅ REALTIME EVENT (future sync layer)
    eventBus.publish({
      type: "delivery.created",
      payload: delivery,
      meta: {
        source: "server",
        orgId,
      },
    });

    return NextResponse.json(
      {
        data: delivery,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
