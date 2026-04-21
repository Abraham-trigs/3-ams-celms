import { NextRequest, NextResponse } from "next/server";
import { priceService } from "@zodiac/services/price.service";
import { eventBus } from "@/eventBus";

export async function GET(req: NextRequest) {
  const orgId = new URL(req.url).searchParams.get("orgId");

  if (!orgId) {
    return NextResponse.json({ error: "orgId is required" }, { status: 400 });
  }

  const data = await priceService.list(orgId);

  return NextResponse.json({
    data,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const orgId = req.headers.get("x-org-id");
    if (!orgId) {
      return NextResponse.json(
        { error: "Missing org context" },
        { status: 401 },
      );
    }

    if (!body?.serviceId) {
      return NextResponse.json(
        { error: "serviceId is required" },
        { status: 400 },
      );
    }

    const updated = await priceService.updatePrice(
      body.serviceId,
      body.price,
      orgId, // ✅ tenant isolation enforced here too
    );

    // ✅ realtime hook (future sync layer)
    eventBus.publish({
      type: "price.updated",
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
