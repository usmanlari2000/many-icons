import connectToDB from "@/lib/mongodb";
import { Icon } from "@/models/icon";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);

    const pageParam = Number(url.searchParams.get("page") || "1");
    const page = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

    const recordsCount = (await Icon.distinct("iconSet")).length;
    const pagesCount = Math.ceil(recordsCount / 12);

    if (page > pagesCount) {
      return NextResponse.json({ iconSets: [], pagesCount }, { status: 200 });
    }

    const recordsPerPage = page * 12;

    const iconSets = await Icon.aggregate([
      {
        $group: {
          _id: "$iconSet",
          iconsCount: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          iconsCount: 1,
          _id: 0,
        },
      },
    ])
      .sort({ name: 1 })
      .limit(recordsPerPage);

    return NextResponse.json({ iconSets, pagesCount }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
