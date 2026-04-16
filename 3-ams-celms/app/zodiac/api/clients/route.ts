import { NextRequest, NextResponse } from "next/server";
import { clientService } from "@/server/services/client.service";
import { eventBus } from "@/server/events/eventBus";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const orgId = searchParams.get("orgId");
    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page") || 1);
    const perPage = Number(searchParams.get("perPage") || 20);

    if (!orgId) {
      return NextResponse.json({ error: "orgId is required" }, { status: 400 });
    }

    const result = await clientService.search(orgId, query, {
      page,
      perPage,
    });

    return NextResponse.json({
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

    const client = await clientService.create({
      ...body,
      orgId,
    });

    // ✅ REALTIME EVENT HOOK (sync layer ready)
    eventBus.publish({
      type: "client.created",
      payload: client,
      meta: {
        source: "server",
        orgId,
      },
    });

    return NextResponse.json(
      {
        data: client,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
