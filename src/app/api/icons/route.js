import connectToDB from "@/lib/mongodb";
import { Icon } from "@/models/icon";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);

    const searchParam = url.searchParams.get("search");
    const search = searchParam || "";

    const filterParam = url.searchParams.get("filter");
    let filter = [];

    try {
      const parsed = JSON.parse(filterParam);

      if (
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
      ) {
        filter = parsed;
      }
    } catch {
      filter = [];
    }

    const pageParam = url.searchParams.get("page");
    const page = /^[1-9]\d*$/.test(pageParam) ? Number(pageParam) : 1;

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
