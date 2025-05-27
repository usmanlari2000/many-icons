import connectToDB from "@/lib/mongodb";
import { Icon } from "@/models/icon";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);

    const search = url.searchParams.get("search") || "";

    const filterParam = url.searchParams.get("filter");
    let filter = [];

    try {
      if (/^\[\s*(?:"[^"]*"\s*,\s*)*"[^"]*"\s*\]$/.test(filterParam)) {
        filter = JSON.parse(filterParam);
      }
    } catch {
      filter = [];
    }

    const pageParam = Number(url.searchParams.get("page") || "1");
    const page = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

    const query = {
      ...(filter.length && { iconSet: { $in: filter } }),
      ...(search && { iconName: { $regex: search, $options: "i" } }),
    };

    const recordsCount = await Icon.countDocuments(query);
    const pagesCount = Math.ceil(recordsCount / 120);

    if (page > pagesCount) {
      return NextResponse.json({ icons: [], pagesCount }, { status: 200 });
    }

    const recordsPerPage = page * 120;

    const icons = await Icon.find(query)
      .sort({ iconName: 1 })
      .limit(recordsPerPage);

    return NextResponse.json({ icons, pagesCount }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
