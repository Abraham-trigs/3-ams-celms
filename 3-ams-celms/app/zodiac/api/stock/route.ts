import { NextRequest, NextResponse } from "next/server";
import { stockService } from "@/server/services/stock.service";
import { eventBus } from "@/server/events/eventBus";

export async function GET(req: NextRequest) {
  try {
    const orgId = new URL(req.url).searchParams.get("orgId");

    if (!orgId) {
      return NextResponse.json({ error: "orgId is required" }, { status: 400 });
    }

    const data = await stockService.list(orgId);

    return NextResponse.json({
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ MULTI-TENANT SAFETY (CRITICAL FIX)
    const orgId = req.headers.get("x-org-id");
    if (!orgId) {
      return NextResponse.json(
        { error: "Missing org context" },
        { status: 401 },
      );
    }

    if (!body?.stockItemId) {
      return NextResponse.json(
        { error: "stockItemId is required" },
        { status: 400 },
      );
    }

    const restock = await stockService.restock(
      body.stockItemId,
      body.quantity,
      body.unitCost,
      orgId,
    );

    // ✅ REALTIME EVENT (sync layer foundation)
    eventBus.publish({
      type: "stock.restocked",
      payload: restock,
      meta: {
        source: "server",
        orgId,
      },
    });

    return NextResponse.json(
      {
        data: restock,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
