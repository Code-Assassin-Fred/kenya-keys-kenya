import { NextResponse } from "next/server";

// TODO: Replace with new AI provider API integration
export async function POST(req: Request) {
    // Intentionally returning 429 — mimicking a quota/credits error
    // while we transition to a new API provider.
    return NextResponse.json(
        {
            error: "API Error 429: Insufficient credits. Please try again later.",
        },
        { status: 429 }
    );
}
